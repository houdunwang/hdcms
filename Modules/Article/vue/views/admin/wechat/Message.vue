<template>
    <div>
        <hd-tab :tabs="tabs" />
        <hd-wechat-message :site_id="hd.site.id" message-type="news" :show-type-button="true" :module_id="hd.module.id" />
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    route: { meta: { title: '微信被动消息 ' } },
    data() {
        return { tabs }
    }
}
</script>

<style></style>
