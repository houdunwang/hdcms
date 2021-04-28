<template>
    <div v-loading="loading">
        <hd-tab :tabs="tabs" />
        <el-alert type="success" effect="light" closable class="border mb-3" v-if="goods"> 正在设置 【{{ goods.title }}】 的货品 </el-alert>
        <table class="table table-vcenter card-table shadow-sm border border-gray-200" v-if="products">
            <thead>
                <tr>
                    <th v-for="attribute in attributes" :key="attribute.id">
                        {{ attribute.title }}
                    </th>
                    <th>货号</th>
                    <th>库存</th>
                    <th width="80"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="index">
                    <td v-for="(attribute, i) in attributes" :key="attribute.id">
                        <el-select v-model="product.attributeList[i]" clearable filterable>
                            <el-option v-for="item in attribute.attributes" :key="item.id" :label="item.attribute_value" :value="item.id"> </el-option>
                        </el-select>
                    </td>
                    <td>
                        <el-input v-model="product.sn" placeholder="" size="default" clearable :disabled="!!product.id"></el-input>
                    </td>
                    <td>
                        <el-input type="number" v-model="product.number" placeholder="" size="default" clearable></el-input>
                    </td>
                    <td>
                        <el-button type="danger" size="mini" @click="del(product)">删除</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-button-group class="mt-3">
            <el-button type="info" size="default" @click="add">添加货品</el-button>
            <el-button type="primary" size="default" @click="onSubmit">保存提交</el-button>
        </el-button-group>
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    data() {
        return {
            tabs,
            attributes: [],
            goods: null,
            products: null,
            loading: true
        }
    },
    async created() {
        this.goods = await axios.get(`goods/${this.$route.query.gid}`)
        this.attributes = await axios.get(`goods/${this.$route.query.gid}/rule_attribute_list`)
        this.products = await axios.get(`goods/${this.goods.id}/product`)
        this.loading = false
    },
    methods: {
        //删除
        del(product) {
            this.products.splice(this.products.indexOf(product), 1)
        },
        //添加属性
        add() {
            this.products.push({ attributeList: [], number: '', sn: '' })
        },
        //提交
        async onSubmit() {
            axios.post(`goods/${this.goods.id}/product`, this.products)
        }
    }
}
</script>

<style lang="scss">
.table thead th {
    font-size: 0.8rem;
}
</style>
