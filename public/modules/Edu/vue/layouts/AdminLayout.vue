<template>
    <div>
        <hd-admin :menus="menus" />
    </div>
</template>

<script>
import menus from '../config/menus'

export default {
    data() {
        return { menus }
    }
}
</script>

<style lang="scss"></style>
