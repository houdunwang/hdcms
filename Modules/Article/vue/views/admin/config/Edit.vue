<template>
    <div>
        Edit...
    </div>
</template>

<script>
import tabs from './tabs'
const form = { logo: '' }
export default {
    route: { meta: { title: '模块配置' } },
    data() {
        return { tabs, form, loading: true, submit: false }
    }
}
</script>

<style></style>
