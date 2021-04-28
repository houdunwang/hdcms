<template>
    <div class="p-3 pt-5 border border-gray-200 rounded-md">
        <div v-for="(attribute, index) in goods.attributes" :key="index">
            <el-form-item size="normal">
                <template slot="label">
                    {{ attribute.title }}
                    <i class="fas fa-plus-square cursor-pointer" v-if="attribute.type == 2 && isFirstRule(attribute)" @click="add(attribute)"></i>
                    <i class="fas fa-minus-square cursor-pointer" v-if="attribute.type == 2 && !isFirstRule(attribute)" @click="del(attribute)"></i>
                </template>
                <div class="flex w-8/12">
                    <div :class="{ 'w-8/12': attribute.type == 2, 'w-full': attribute.type == 1 }">
                        <template v-if="attribute.form_type == 'input'">
                            <el-input v-model="attribute.attribute_value" placeholder="" size="normal" clearable></el-input>
                        </template>
                        <template v-else-if="attribute.form_type == 'textarea'">
                            <el-input type="textarea" v-model="attribute.attribute_value" placeholder="" size="normal" clearable></el-input>
                        </template>
                        <template v-else-if="attribute.form_type == 'image'">
                            <hd-upload-image v-model="attribute.attribute_value" :width="100" :height="100" />
                        </template>
                        <template v-else-if="attribute.form_type == 'color'">
                            <el-color-picker v-model="attribute.attribute_value"></el-color-picker>
                        </template>
                        <template v-else-if="attribute.form_type == 'select'">
                            <el-select v-model="attribute.attribute_value" clearable filterable class="w-full">
                                <el-option v-for="(item, index) in attribute.optionsList" :key="index" :label="item" :value="item"> </el-option>
                            </el-select>
                        </template>
                    </div>
                    <el-input v-model="attribute.price" class="ml-2 w-4/12" v-if="attribute.type == 2">
                        <template slot="prepend">加价</template>
                    </el-input>
                </div>
            </el-form-item>
        </div>
    </div>
</template>

<script>
export default {
    props: ['goods'],
    async created() {
        this.goods.attributes = await this.formatGoodsAttributes()
    },
    methods: {
        //对商品属性数据规范化
        async formatGoodsAttributes() {
            //类型属性
            const attributes = await this.getTypeAttributes()
            //编辑状态
            if (this.goods.id) {
                const goodsAttributes = await axios.get(`goods/${this.goods.id}/attribute`)
                //原商品属性数据赋值给属性
                goodsAttributes.forEach(goodsAttribute => {
                    const attribute = attributes.find(a => a.attribute_id == goodsAttribute.attribute_id)
                    if (attribute) {
                        switch (attribute.type) {
                            case 1:
                                //普通属性只改属性值
                                _.merge(attribute, goodsAttribute)
                                break
                            case 2:
                                //添加规格属性
                                attributes.push(_.merge(_.cloneDeep(attribute), goodsAttribute))
                                break
                        }
                    }
                })
            }
            return attributes.sort((a, b) => a.attribute_id - b.attribute_id)
        },
        //获取商品类型属性
        async getTypeAttributes() {
            //商品类型的属性
            const attributes = await axios.get(`type/${this.goods.attribute_type_id}/attribute`)
            attributes.forEach(attribute => {
                attribute.attribute_id = attribute.id
                attribute.attribute_value = ''
                attribute.price = 0
                delete attribute.id
            })
            return attributes
        },
        //添加属性
        add(attribute) {
            attribute = _.cloneDeep(attribute)
            delete attribute.id
            attribute.attribute_value = ''
            attribute.price = 0
            this.goods.attributes.push(attribute)
            this.goods.attributes.sort((a, b) => a.attribute_id - b.attribute_id)
        },
        //当前属性是否为规则中的第一个
        isFirstRule(attribute) {
            return this.goods.attributes.filter(a => a.attribute_id == attribute.attribute_id).indexOf(attribute) == 0
        },
        async del(attribute) {
            await this.$confirm('确定删除吗?', '温馨提示')
            if (attribute.id) {
                await axios.delete(`goods/${this.goods.id}/attribute/${attribute.id}`)
            }
            const index = this.goods.attributes.indexOf(attribute)
            this.goods.attributes.splice(index, 1)
        }
    }
}
</script>

<style></style>
