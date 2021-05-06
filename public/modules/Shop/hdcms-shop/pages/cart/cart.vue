<template>
	<view>
		<hd-navbar title="购物车" :showInput="false" :showCartIcon="false" :showHomeIcon="true"></hd-navbar>
		<cart-list></cart-list>
		<cart-tabbar></cart-tabbar>
	</view>
</template>

<script>
	import CartList from './components/cartList.vue'
	import CartTabbar from './components/cartTabBar.vue'
	export default {
		components: {
			CartList,CartTabbar
		},
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style>

</style>
