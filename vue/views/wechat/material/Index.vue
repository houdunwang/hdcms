<template>
    <div>
        <hd-tab :tabs="tabs" />
        <hd-wechat-material :wechat_id="$route.query.wid" :site_id="$route.query.sid" :material-type="$route.query.type" v-if="wechat" />
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    data() {
        return {
            tabs: tabs(this.$route.query.sid),
            sid: this.$route.query.sid,
            wechat: null
        }
    },
    async created() {
        this.wechat = await axios.get(`site/${this.sid}/wechat/${this.$route.query.wid}`)
    }
}
</script>

<style></style>
