<template>
	<view>
		<u-tabbar v-model="current" :list="list" active-color="#EF4444"></u-tabbar>
	</view>
</template>

<script>
	import list from './list.js'
	export default {
		data() {
			return {
				list,
				current: 0
			}
		},
	}
</script>
