<template>
    <div>
        <hd-tab :tabs="tabs" />
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    route: { path: '/' },
    data() {
        return { tabs }
    }
}
</script>

<style></style>
