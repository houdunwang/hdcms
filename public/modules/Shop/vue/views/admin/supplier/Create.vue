<template>
    <div>
        <hd-tab :tabs="tabs" />
        <x-form />
    </div>
</template>

<script>
import tabs from './tabs'
import XForm from './Form'
export default {
    components: { XForm },
    data() {
        return { tabs }
    }
}
</script>

<style></style>
