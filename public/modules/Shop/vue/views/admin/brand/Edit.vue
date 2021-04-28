<template>
    <div>
        <hd-tab :tabs="tabs" />
        <x-form :brand="brand" v-if="brand" />
    </div>
</template>

<script>
import tabs from './tabs'
import XForm from './Form'
export default {
    components: { XForm },
    data() {
        return { tabs, brand: null }
    },
    async created() {
        this.brand = await axios.get(`brand/${this.$route.query.id}`)
    },
    methods: {}
}
</script>

<style></style>
