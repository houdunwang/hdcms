<template>
    <div>
        <hd-upload-image v-model="form[field.name]" />
    </div>
</template>

<script>
export default {
    props: ['field', 'form']
}
</script>

<style></style>
