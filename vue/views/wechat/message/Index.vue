<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-alert effect="light" closable class="mb-2" v-if="wechat"> 正在管理【{{ wechat.title }}】公众号的消息 </el-alert>
        <hd-wechat-message :site_id="$route.query.sid" :wechat_id="$route.query.wid" :message-type="$route.query.type" />
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    data() {
        return {
            tabs,
            wechat: null
            // sid: this.$route.query.sid,
        }
    },
    async created() {
        this.wechat = await axios.get(`site/${this.$route.query.sid}}/wechat/${this.$route.query.wid}`)
    }
}
</script>

<style></style>
