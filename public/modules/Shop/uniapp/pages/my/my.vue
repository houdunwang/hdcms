<template>
	<view v-if="isLogin">
		<hd-navbar :showInput="false" title="个人中心" :showCartIcon="false"></hd-navbar>
		<view class="flex justify-center items-center h-150 bg-white shadow-sm">
			<image class="w-80 h-80 shadow-md rounded-full" :src="user.icon" mode="aspectFill"></image>
		</view>
		<uni-list>
			<uni-list-item title="我的资料" link></uni-list-item>
			<uni-list-item title="地址管理" link></uni-list-item>
			<uni-list-item title="购物车" :show-badge="true" link :badge-text="cartGoodsTotalNumber()+''"
				@click="switchTab('/pages/cart/cart')">
			</uni-list-item>
			<uni-list-item title="优惠券" link="switchTab" to="/pages/coupon/coupon"></uni-list-item>
			<uni-list-item title="客服电话" note="1999827776(时间: 09:00 18:30)"></uni-list-item>
			<uni-list-item title="退出登录" clickable @click="exit"></uni-list-item>
		</uni-list>
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		onShow() {
			this.loginCheck()
		},
		computed: {
			...mapGetters('cart', {
				cartGoodsTotalPrice: 'totalPrice',
				cartGoodsTotalNumber: 'totalNumber'
			})
		},
		methods: {
			...mapMutations('user',['logout']),
			exit() {
				uni.showModal({
					title: '确定退出吗？',
					success: (res) => {
						if (res.confirm) {
							this.logout()
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>
