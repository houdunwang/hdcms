<template>
    <el-dialog :visible.sync="dialogVisible" :width="minWidth">
        <img :src="imagePreview" style="width:100%;" />
    </el-dialog>
</template>

<script>
export default {
    props: {
        width: { type: Number, default: 300 }
    },
    data() {
        return {
            dialogVisible: false,
            imagePreview: ''
        }
    },
    mounted() {
        this.$nextTick(_ => {
            this.$parent.$el.addEventListener('click', event => {
                if (event.target.nodeName == 'IMG') {
                    if (event.target.clientWidth > this.width) {
                        const src = event.target.getAttribute('src')
                        this.dialogVisible = true
                        this.imagePreview = src
                    }
                }
            })
        })
    },
    computed: {
        minWidth() {
            return document.documentElement.clientWidth < 768 ? '100%' : '50%'
        }
    }
}
</script>

<style></style>
