<template>
	<view>
		<u-navbar back-text="返回" :is-fixed="true">
			<u-search placeholder="日照香炉生紫烟" v-model="keyword" search-icon="search"></u-search>
		</u-navbar>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: ''
			}
		},
		methods: {

		}
	}
</script>

<style>
	 .status_bar {
		height: var(--status-bar-height);
		width: 100%;
	} 
</style>
