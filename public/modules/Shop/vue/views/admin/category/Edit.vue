<template>
    <div>
        <hd-tab :tabs="tabs" />
        <x-form :category="category" v-if="category" />
    </div>
</template>

<script>
import tabs from './tabs'
import XForm from './Form'
export default {
    components: { XForm },
    data() {
        return { tabs, category: null }
    },
    async created() {
        this.category = await axios.get(`category/${this.$route.query.id}`)
    }
}
</script>

<style></style>
