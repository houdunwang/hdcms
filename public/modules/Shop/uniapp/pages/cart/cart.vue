<template>
	<view>
		<hd-navbar title="购物车" :showInput="false" :showCartIcon="false" :showHomeIcon="true" :showUserIcon="true"></hd-navbar>
		<cart-list></cart-list>
		<cart-tabbar></cart-tabbar>
	</view>
</template>

<script>
	import CartList from './components/cartList.vue'
	import CartTabbar from './components/cartTabBar.vue'
	import {mapActions} from 'vuex';
	export default {
		components: {
			CartList,CartTabbar
		},
		onShow(){
			this.loadAddress()
		},
		data() {
			return {
			}
		},
		methods: {
			...mapActions('address',{
				loadAddress:'load'
			})
		}
	}
</script>

<style>

</style>
