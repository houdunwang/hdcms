<template>
    <div>
        <hd-tab :tabs="tabs" />
        <hd-wechat-material :site_id="site.id" :show-type-button="true" :module_id="module.id" />
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    route: { meta: { title: '微信素材' } },
    data() {
        return { tabs }
    }
}
</script>

<style></style>
