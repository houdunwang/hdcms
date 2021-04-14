<template>
    <div>
        <div class="field-images flex flex-wrap">
            <div class="relative" v-for="(img, index) in form[field.name]" :key="index">
                <el-image :src="img" fit="cover" class="image border rounded-md"></el-image>
                <i
                    class="fas fa-window-close absolute top-1 right-2 text-white border border-gray-300 cursor-pointer shadow-lg rounded-sm overflow-hidden"
                    @click="del(index)"
                ></i>
            </div>
            <hd-upload-images @upload="upload" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['field', 'form'],
    methods: {
        upload(file) {
            this.form[this.field.name].push(file)
        },
        del(index) {
            this.$confirm('确定删除吗？', '温馨提示').then(_ => {
                this.form[this.field.name].splice(index, 1)
            })
        }
    }
}
</script>

<style scoped lang="scss">
.field-images {
    .image {
        width: 100px;
        height: 100px;
        margin-right: 5px;
        margin-bottom: 5px;
    }
}
</style>
