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

		<view class="mt-30">
			<uni-card title="优惠券" v-if="coupon" :is-full="true">
				<hd-coupon-item :coupon="coupon">
					<button type="default" size="mini" @click="coupon=null">取消优惠券</button>
				</hd-coupon-item>
			</uni-card>
			<uni-list>
				<uni-list-item title="优惠券" link clickable @click="couponPopup=true" @select="couponPopup=false"
					v-if="!coupon">
				</uni-list-item>
			</uni-list>
			<u-popup v-model="couponPopup" mode="bottom" :mask-close-able="true">
				<coupon-select @select="selectCoupon"></coupon-select>
				<button type="default" @click="couponPopup=false">取消选择</button>
			</u-popup>
		</view>
		<view class="bg-white flex flex-row h-50 items-stretch hd-cart-footer">
			<view class="flex-1 flex flex-col justify-center items-center">
				<view class="text-base flex flex-col items-center justify-center">
					<view class="text-base text-gray-500">共 <text class=""> {{cartGoodsTotalNumber(true)}} </text> 件
					</view>
					<view class="text-red-600 ">
						合计：<text class="font-bold">{{totalPrice}}</text>
					</view>
				</view>
			</view>
			<view class="bg-gray-200 flex-1 justify-center items-center flex text-gray-800 text-lg"
				@click="switchTab('/pages/cart/cart')">
				购物车
			</view>
			<view class="bg-red-500 flex-1 justify-center items-center flex text-white text-lg" @click="submit">
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
	import couponSelect from './components/couponSelect.vue'
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		components: {
			couponSelect
		},
		data() {
			return {
				pays,
				type: 'alipay',
				//优惠券弹出层
				couponPopup: false,
				coupon: null
			}
		},
		computed: {
			...mapState(['cart']),
			...mapGetters(['cartGoodsTotalPrice', 'cartGoodsTotalNumber']),
			totalPrice() {
				let price = this.cartGoodsTotalPrice(true)
				if (this.coupon) {
					switch (this.coupon.type) {
						case 'fixed_price':
							price -= this.coupon.value
							break;
						case 'discount':
							price *= this.coupon.value
					}
				}
				return Math.round(price);
			}
		},
		methods: {
			//选择优惠券
			selectCoupon(coupon) {
				this.couponPopup = false
				this.coupon = coupon
			},
			//提交定单
			async submit() {
				const goods = this.cart;
				const coupon = this.coupon;

				await this.$api.post(`order`, {
					goods,
					coupon
				}).then(res => {
					uni.showToast({
						title: '支付成功',
						duration:2000
					})
					uni.navigateTo({
						url: '/pages/order/order'
					})
				}).catch(e => {
					uni.showModal({
						title: '订单提交失败'
					})
				})
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
