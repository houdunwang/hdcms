<template>
	<view>
		<hd-navbar :showHomeIcon="true" :showCartIcon="false" :showInput="false" :showUserIcon="true" title="用户结算">
		</hd-navbar>
		<view class="mt-20">
			<uni-card title="收货地址" :is-full="true">
				<view class="font-bold text-lg">
					向军 19999999999
				</view>
				<view>
					北京 北京市 朝阳区 左家庄街道 左家庄 (100020)
				</view>
			</uni-card>
		</view>

		<view class="mt-30">
			<uni-list>
				<uni-list-item v-for="(pay,index) in pays" :key="index">
					<template #header>
						<view class="flex items-center">
							<i class="iconfont text-lg mr-20" :class="pay.icon" :style="{color:pay.color}"
								style="font-size:50rpx;"></i> {{pay.title}}
						</view>
					</template>
					<template #footer>
						<u-radio-group v-model="type">
							<u-radio shape="circle" :name="pay.type"></u-radio>
						</u-radio-group>
					</template>
				</uni-list-item>
			</uni-list>
		</view>

		<view class="bg-white flex flex-row h-50 items-stretch hd-cart-footer">
			<view class="flex-1 flex flex-col justify-center items-center">
				<view class="text-base flex flex-col items-center justify-center">
					<view class="text-base text-gray-500">共 <text class=""> {{cartGoodsTotalNumber(true)}} </text> 件
					</view>
					<view class="text-red-600 ">
						合计：<text class="font-bold">{{cartGoodsTotalPrice(true)}}</text>
					</view>
				</view>
			</view>
			<view class="bg-gray-200 flex-1 justify-center items-center flex text-gray-800 text-lg"
				@click="switchTab('/pages/cart/cart')">
				购物车
			</view>
			<view class="bg-red-500 flex-1 justify-center items-center flex text-white text-lg">
				去付款
			</view>
		</view>
	</view>
</template>

<script>
	const pays = [{
			title: '支付宝',
			type: 'alipay',
			icon: 'icon-zhifubao',
			color: '#FB4140'
		},
		{
			title: '微信',
			type: 'wepay',
			icon: 'icon-weixinzhifu',
			color: '#0BB702'
		},
	];
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				pays,
				type: 'alipay'
			}
		},
		onShow() {
			if (this.cartGoodsTotalPrice(true) <= 0) {
				uni.showModal({
					title: '提示',
					content: '你还没有选择商品',
					success: function(res) {
						uni.switchTab({
							url: '/pages/cart/cart'
						})
					}
				});
			}
		},
		computed: {
			...mapGetters(['cartGoodsTotalPrice', 'cartGoodsTotalNumber'])
		},
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
