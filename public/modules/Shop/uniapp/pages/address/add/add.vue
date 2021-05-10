<template>
	<view>
		<hd-navbar :back="true" :showHomeIcon="false" :showCartIcon="false"
		:showInput="false" title="地址管理"></hd-navbar>
		<x-form :data="data" />
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	import XForm from '../components/form.vue'
	export default {
		components: {
			XForm
		},
		data() {
			return {
				data: {
					consignee: '',
					district: '',
					info: '',
					tel: '',
					is_default: false
				}
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
