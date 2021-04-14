<template>
    <div>
        <hd-wang-editor :name="field.name" v-model="form[field.name]" @uploadImage="uploadImage" />
        <hd-tip>系统会自动提取编辑器中尺寸大于 500X500 的图片到图集中</hd-tip>
    </div>
</template>

<script>
export default {
    props: ['field', 'form'],
    methods: {
        uploadImage(url) {
            const img = new Image()
            img.src = url
            img.onload = function() {
                if (img.width > 500 && img.height > 500) {
                    this.form['images'].push(url)
                }
            }.bind(this)
        }
    }
}
</script>

<style></style>
