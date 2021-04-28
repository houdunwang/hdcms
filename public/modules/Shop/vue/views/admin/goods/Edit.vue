<template>
    <div>
        <hd-tab :tabs="tabs" />
        <x-form :goods="goods" v-if="goods" />
    </div>
</template>

<script>
import tabs from './tabs'
import XForm from './Form'
export default {
    components: { XForm },
    data() {
        return { tabs, goods: null }
    },
    async created() {
        this.goods = await axios.get(`goods/${this.$route.query.id}`)
    }
}
</script>

<style></style>
