<template>
    <el-form :model="form" ref="form" label-width="80px" :inline="false" size="normal">
        <el-tabs value="base" type="border-card" class="shadow-sm border-gray-200">
            <el-tab-pane label="基本信息" name="base">
                <el-form-item label="商品名称">
                    <el-input v-model="form.title"></el-input>
                    <hd-form-error name="title" />
                </el-form-item>
                <el-form-item label="所属栏目">
                    <el-select v-model="form.category_id" placeholder="选择栏目" clearable filterable v-if="categories">
                        <el-option
                            v-for="item in categories"
                            :key="item.id"
                            :label="item.levelTitle"
                            :value="item.id"
                            :disabled="item.disabled"
                            :selected="form.pid == item.id"
                        >
                        </el-option>
                    </el-select>
                    <hd-form-error name="category_id" />
                </el-form-item>
                <el-form-item label="推荐">
                    <el-radio-group v-model="form.is_commend" size="mini">
                        <el-radio-button
                            v-for="(item, index) in [
                                { label: '是', value: true },
                                { label: '否', value: false }
                            ]"
                            :key="index"
                            :label="item.value"
                        >
                            {{ item.label }}
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="货号" size="normal">
                    <el-input v-model="form.sn" placeholder="请输入货号" size="normal" clearable></el-input>
                    <hd-tip>如果不输入货号，系统将自动生成货号</hd-tip>
                </el-form-item>
                <el-form-item label="价格" size="normal">
                    <el-input type="number" v-model="form.price" placeholder="" size="normal" clearable></el-input>
                    <hd-form-error name="price" />
                </el-form-item>
                <el-form-item label="市场价格" size="normal">
                    <el-input type="number" v-model="form.market_price" placeholder="" size="normal" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品图片" size="normal">
                    <hd-upload-image v-model="form.preview" :width="100" :height="100" />
                    <hd-form-error name="preview" />
                </el-form-item>
                <el-form-item label="列表图片" size="normal">
                    <hd-upload-image v-model="form.thumb" :width="100" :height="100" />
                    <hd-tip>不添加时将使用商品图片自动生成 </hd-tip>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="其他信息" name="other">
                <el-form-item label="上架">
                    <el-checkbox v-model="form.state" :true-label="1" :false-label="0">
                        选中表示商品上架销售
                    </el-checkbox>
                </el-form-item>
                <el-form-item label="品牌" size="normal">
                    <el-dialog title="选择品牌" :visible.sync="brandDialog" width="80%">
                        <x-brand #default="{brand}" :width="100">
                            <el-button type="success" size="mini" @click="changeBrand(brand)">选择</el-button>
                        </x-brand>
                    </el-dialog>
                    <el-image :src="form.brand.logo" fit="cover" class="w-20 h-10" v-if="form.brand.logo"></el-image>
                    <el-button type="primary" size="mini" @click="brandDialog = true" class="d-block">选择品牌</el-button>
                </el-form-item>
                <el-form-item label="库存数量" size="normal">
                    <el-input v-model="form.number" placeholder="" size="normal" clearable></el-input>
                </el-form-item>
                <el-form-item label="关键词" size="normal">
                    <el-input v-model="form.keywords" placeholder="" size="normal" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品描述" size="normal">
                    <el-input v-model="form.description" placeholder="" size="normal" clearable></el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="详细介绍" name="content">
                <hd-wang-editor v-model="form.content" />
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="attribute">
                <el-form-item label="属性类型" size="normal">
                    <el-select v-model="form.attribute_type_id" clearable filterable>
                        <el-option v-for="item in attributeTypes" :key="item.id" :label="item.title" :value="item.id"> </el-option>
                    </el-select>
                </el-form-item>
                <attribute :goods="form" v-if="form.attribute_type_id" :key="form.attribute_type_id" />
            </el-tab-pane>
            <el-tab-pane label="图片集" name="images">
                <div class="flex">
                    <hd-upload-images :multiple="true" @upload="form.images.push($event)" class="mr-2" />
                    <el-image
                        v-for="(img, index) in form.images"
                        :key="index"
                        :src="img"
                        fit="cover"
                        class="mr-2 rounded-sm"
                        style="width:100px;height:100px;"
                    ></el-image>
                </div>
                <hd-tip>用于商品详情页的图片展示</hd-tip>
            </el-tab-pane>
        </el-tabs>
        <div class="mt-3">
            <el-button type="primary" @click="onSubmit" v-loading="isSubmit" :disabled="isSubmit">保存提交</el-button>
        </div>
    </el-form>
</template>

<script>
const form = {
    title: '',
    is_commend: false,
    sn: '',
    state: 1,
    price: null,
    market_price: null,
    preview: null,
    thumb: null,
    images: [],
    content: '',
    number: 1,
    keywords: '',
    description: '',
    attributes: [],
    brand_id: null,
    brand: { logo: '' }
}
import Attribute from './components/Attribute'
export default {
    components: { Attribute },
    props: ['goods'],
    data() {
        return { form: _.cloneDeep(_.merge(form, this.goods)), categories: [], isSubmit: false, attributeTypes: [], brandDialog: false }
    },
    async created() {
        this.categories = this.formatCategory(await axios.get(`category`))
        this.attributeTypes = await axios.get(`attributeType`)
    },

    methods: {
        async onSubmit() {
            this.isSubmit = true
            const url = `goods/${this.form.id ?? ''}`
            axios[this.form.id ? 'put' : 'post'](url, this.form)
                // .then(_ => this.$router.push({ name: 'admin.goods.index' }))
                .finally(_ => (this.isSubmit = false))
        },
        formatCategory(categories) {
            return categories.map(c => {
                c.disabled = c.id == this.form.id || c.path.includes(this.form.path + '-' + this.form.id)
                return c
            })
        },
        //选择品牌
        changeBrand(brand) {
            this.form.brand_id = brand.id
            this.form.brand = brand
            this.brandDialog = false
        }
    }
}
</script>

<style></style>
