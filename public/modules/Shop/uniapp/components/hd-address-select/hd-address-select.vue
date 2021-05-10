<template>
	<view>
		<u-select v-model="show" mode="mutil-column-auto" label-name="text" :list="cityData" @confirm="confirm" />
		<view class="" @click="show=true">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	import cityData from '@/data/picker.city.js'

	export default {
		data() {
			return {
				show: false,
				cityData
			}
		},
		methods: {
			confirm(list) {
				this.$emit('confirm', list);
			}
		}
	}
</script>

<style>

</style>
