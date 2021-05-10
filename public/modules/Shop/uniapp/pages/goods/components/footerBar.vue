<template>
	<view>
		<view class="bg-white flex flex-row items-center h-60 items-stretch hd-cart-footer px-20">
			<view class="w-60 flex items-center justify-center">
				<navigator open-type="switchTab" url="/pages/cart/cart"
					class="flex flex-col items-center justify-center ">
					<uni-icons type="cart-filled" size="20"></uni-icons>
					<view>购物车</view>
				</navigator>
			</view>
			<view class="w-100 flex flex-col justify-center items-center">
				<view>
					共有 {{totalNumber()}} 件
				</view>
				<view>
					<text class="text-red-600 text-lg mr-10" style="font-weight: bold;">
						{{totalPrice()}}
					</text> 元
				</view>
			</view>
			<view class="flex-1 text-lg flex justify-end items-center">
				<slot name="right">
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'

	export default {
		props: {
			goods: Object
		},
		data() {
			return {
				showCart: false
			}
		},
		computed: {
			...mapState('cart', {
				'cart': state => state.cart
			}),
			...mapGetters('cart', [
				'totalPrice',
				'totalNumber'
			])
		},
		methods: {}
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
