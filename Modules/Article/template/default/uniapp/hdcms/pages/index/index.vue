<template>
	<view >
			<!-- #ifndef APP-PLUS -->
			<uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar>
			<!-- #endif -->
	</view>
</template>

<script>
	// #ifndef APP-PLUS
	// import Search from '@/components/Search.vue'
	// #endif
	export default {
		components:{
			// #ifndef APP-PLUS
			// Search
			// #endif
		},
		data() {
			return {
			
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	
</style>
