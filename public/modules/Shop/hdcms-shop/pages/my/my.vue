<template>
	<view v-if="isLogin">
		<hd-navbar :showInput="false" title="个人中心" :showCartIcon="false"></hd-navbar>
		<view class="flex justify-center items-center h-150 bg-white shadow-sm">
			<image class="w-80 h-80 shadow-md rounded-full"
				:src="user.icon"
				mode="aspectFill"></image>
		</view>
		<uni-list>
			<uni-list-item title="我的资料" link></uni-list-item>
			<uni-list-item title="地址管理" link></uni-list-item>
			<uni-list-item title="购物车" :show-badge="true" link :badge-text="cartGoodsTotalNumber()"
				@click="switchTab('/pages/cart/cart')">
			</uni-list-item>
			<uni-list-item title="优惠券" link></uni-list-item>
			<uni-list-item title="客服电话" note="1999827776(时间: 09:00 18:30)"></uni-list-item>
		</uni-list>
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		onShow() {
			this.loginCheck()
		},
		computed: {
			...mapGetters(['cartGoodsTotalPrice', 'cartGoodsTotalNumber'])
		},
		methods: {}
	}
</script>

<style>

</style>
