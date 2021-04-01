<template>
    <div id="app" class="m-auto mt-10">
        <div class="flex justify-center">
            <img src="./assets/logo.png" class="h-20" />
        </div>
        <step />
        <div class="border p-3 shadow-lg mt-5 rounded-md bg-white">
            <router-view />
        </div>
        <div class="text-sm text-gray-800 opacity-60 text-center mt-5 mb-10">
            利用互联网前沿技术，帮助更多的人实现梦想
        </div>
    </div>
</template>

<script>
import Step from '@/components/Step'
export default {
    components: { Step }
}
</script>

<style lang="scss">
body {
    background-color: #f3f3f3;
}
#app {
    width: 1030px;
}
</style>
