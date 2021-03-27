<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-alert effect="light" closable class="mb-2"> 正在管理【{{ wechat.title }}】公众号的消息 </el-alert>
        <hd-wechat-message :wechat="wechat" v-if="wechat.id" :message-type="$route.query.type" />
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    data() {
        return {
            tabs: tabs(this.$route.query.sid),
            sid: this.$route.query.sid,
            wechat: {}
        }
    },
    async created() {
        this.wechat = await axios.get(`site/${this.sid}}/wechat/${this.$route.query.wid}`)
    }
}
</script>

<style></style>
