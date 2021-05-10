<template>
	<view>
		<hd-navbar :back="true" :showHomeIcon="false" :showCartIcon="false"
		:showInput="false" title="地址管理"></hd-navbar>
		<x-form v-if="data" :data="data" />
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	import XForm from '../components/form.vue'
	import {
		mapState,mapActions
	} from 'vuex'
	export default {
		components: {
			XForm
		},
		data() {
			return {
				data: null
			}
		},
		computed: {
			...mapState('address', ['address'])
		},
		async onLoad(options) {
			// console.log(this.address,options);
			this.data = this.address.find(a => a.id == options.id)
		},

		methods: {

		}
	}
</script>

<style>

</style>
