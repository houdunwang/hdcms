<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-alert type="success" effect="light" closable class="border mb-3" v-if="goods"> 正在设置 【{{ goods.title }}】 的货品 </el-alert>
        <table class="table table-vcenter card-table shadow-sm border border-gray-200 ">
            <thead>
                <tr>
                    <th v-for="attribute in attributes" :key="attribute.id">
                        {{ attribute.title }}
                    </th>
                    <th>货品</th>
                    <th>库存</th>
                    <th width="80"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="index">
                    <td v-for="(attribute, i) in attributes" :key="attribute.id">
                        <template v-if="attribute.form_type == 'color'" class="grid grid-cols-4">
                            <div
                                v-for="item in attribute.attributes"
                                :key="item.id"
                                :style="{ 'background-color': item.attribute_value }"
                                class="w-6 h-6 cursor-pointer border-4 border-gray-50"
                                :class="{ 'border-gray-900': product.attributeList[i] == item.id }"
                                @click="product.attributeList[i] = item.id"
                            ></div>
                        </template>
                        <div v-else-if="attribute.form_type == 'image'" class="flex">
                            <div v-for="item in attribute.attributes" :key="item.id" @click="$set(product.attributeList, i, item.id)">
                                <el-popover placement="top" width="200" trigger="hover">
                                    <img :src="item.attribute_value" class="h-30 w-full object-cover" />
                                    <img
                                        slot="reference"
                                        :src="item.attribute_value"
                                        class="w-8 h-8 cursor-pointer border-4 border-gray-50"
                                        :class="{ 'border-gray-900': product.attributeList[i] == item.id }"
                                    />
                                </el-popover>
                            </div>
                        </div>
                        <template v-else>
                            <el-select v-model="product.attributeList[i]" clearable filterable>
                                <el-option v-for="item in attribute.attributes" :key="item.id" :label="item.attribute_value" :value="item.id">
                                    {{ item.attribute_value }}
                                </el-option>
                            </el-select>
                        </template>
                    </td>
                    <td>
                        <el-input v-model="product.sn" placeholder="" size="default" clearable :disabled="!!product.goods_id"></el-input>
                    </td>
                    <td>
                        <el-input v-model="product.number" placeholder="" size="default" clearable></el-input>
                    </td>
                    <td>
                        <el-button type="danger" size="mini" @click="del(product)">删除</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-button-group class="mt-3">
            <el-button type="default" size="default" @click="add">添加货品</el-button>
            <el-button type="primary" size="default" @click="onSubmit">保存提交</el-button>
        </el-button-group>
    </div>
</template>

<script>
import tabs from './tabs'
const field = { attributeList: [], sn: '', number: 0 }
export default {
    data() {
        return {
            tabs,
            attributes: [],
            goods: null,
            products: []
        }
    },
    async created() {
        this.goods = await axios.get(`goods/${this.$route.query.gid}`)
        this.attributes = await axios.get(`goods/${this.$route.query.gid}/product/attributes`)
        this.products = await axios.get(`goods/${this.goods.id}/product`)
    },
    methods: {
        add() {
            this.products.push(_.cloneDeep(field))
        },
        del(product) {
            this.$confirm('确定删除吗?', '温馨提示').then(_ => {
                const index = this.products.indexOf(product)
                this.products.splice(index, 1)
            })
        },
        async onSubmit() {
            await axios.post(`goods/${this.goods.id}/product`, this.products)
            this.$router.push({ name: `admin.goods.index` })
        }
        // changeProductAttribute(product, index, attrbuteId) {
        //     // console.log(attrbuteId)
        //     // this.$set(product, index, attrbuteId)
        //     product.attributeList[1] = 33
        // }
    }
}
</script>

<style lang="scss">
.table thead th {
    font-size: 0.8rem;
}
</style>
