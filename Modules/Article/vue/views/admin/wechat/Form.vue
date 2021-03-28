<template>
    <div>
        <hd-tab :tabs="tabs" />
        <wechat-rule />
    </div>
</template>

<script>
import tabs from './tabs'

export default {
    data() {
        return { tabs }
    }
}
</script>

<style></style>
