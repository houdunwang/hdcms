<template>
    <div>
        <hd-tab :tabs="tabs" />
        <x-form :supplier="supplier" v-if="supplier" />
    </div>
</template>

<script>
import tabs from './tabs'
import XForm from './Form'
export default {
    components: { XForm },
    data() {
        return { tabs, supplier: null }
    },
    async created() {
        this.supplier = await axios.get(`supplier/${this.$route.query.id}`)
    },
    methods: {}
}
</script>

<style></style>
