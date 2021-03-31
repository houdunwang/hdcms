<template>
    <div>
        <XForm :sid="$route.query.sid" />
    </div>
</template>

<script>
import XForm from './Form'
export default {
    components: { XForm }
}
</script>

<style></style>
