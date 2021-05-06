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
    route: { path: 'goods/edit/:id' },
    components: { XForm },
    data() {
        return { tabs, goods: null }
    },
    async created() {
        this.goods = await axios.get(`goods/${this.$route.params.id}`)
    }
}
</script>

<style></style>
