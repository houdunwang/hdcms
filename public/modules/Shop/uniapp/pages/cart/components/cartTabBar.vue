<template>
	<view class="">
		<view class="h-80">
		</view>
		<view class="bg-white flex flex-row h-50 items-stretch hd-cart-footer">
			<view class="flex-1 flex flex-col justify-center items-center">
				<view>
					共 <text class="font-bold">{{cartGoodsTotalNumber(true)}}</text> 件
				</view>
				<view>
					<text class="text-red-600 text-lg">{{cartGoodsTotalPrice(true)}}</text> 元
				</view>
			</view>
			<view class="flex-1 bg-gray-200 text-lg flex justify-center items-center"
				@click="switchTab('/pages/category/category')">
				继续购物
			</view>
			<view class="bg-red-500 flex-1 justify-center items-center flex text-white text-lg" @click="toPay">
				去结算
			</view>
		</view>
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
		computed: {
			...mapGetters(['cartGoodsTotalPrice', 'cartGoodsTotalNumber'])
		},
		methods: {
			toPay() {
				if (this.cartGoodsTotalPrice(true) <= 0) {
					uni.showModal({
						title: '提示',
						content: '你还没有选择商品',
					});
				} else {
					uni.navigateTo({
						url: '/pages/pay/pay'
					})
				}
			}
		}
	}
</script>

<style>
	.hd-cart-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		border-top: solid 1px #999;
	}
</style>
