<template>
    <el-form :model="form" ref="form" label-width="80px" :inline="false" size="normal">
        <el-tabs value="first" type="border-card" class="shadow-sm border-gray-200">
            <el-tab-pane label="基本信息" name="first">
                <el-form-item label="商品名称">
                    <el-input v-model="form.title"></el-input>
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
                <el-form-item label="上架">
                    <el-checkbox v-model="form.state" :true-label="1" :false-label="0">
                        选中表示商品上架销售
                    </el-checkbox>
                </el-form-item>
                <el-form-item label="价格" size="normal">
                    <el-input v-model="form.price" placeholder="" size="normal" clearable></el-input>
                </el-form-item>
                <el-form-item label="市场价格" size="normal">
                    <el-input type="number" v-model="form.market_price" placeholder="" size="normal" clearable></el-input>
                </el-form-item>
                <el-form-item label="商品图片" size="normal">
                    <hd-upload-image v-model="form.thumb" :width="100" :height="100" />
                </el-form-item>
                <el-form-item label="列表图片" size="normal">
                    <hd-upload-image v-model="form.thumb" :width="100" :height="100" />
                    <hd-tip>不添加时将使用商品图片自动生成 </hd-tip>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="其他信息" name="other">
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
            <el-tab-pane label="商品属性" name="attribute"> </el-tab-pane>
            <el-tab-pane label="图片集" name="images">
                <div class="flex">
                    <hd-upload-images :multiple="true" @upload="form.images.push($event)" class="mr-2" />
                    <el-image
                        v-for="(img, index) in form.images"
                        :key="index"
                        :src="img"
                        fit="cover"
                        :lazy="true"
                        class="mr-2 rounded-sm"
                        style="width:100px;height:100px;"
                    ></el-image>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="mt-3">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
    description: ''
}
export default {
    data() {
        return { form }
    },
    methods: {
        onSubmit() {}
    }
}
</script>

<style></style>
