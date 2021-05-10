<template>
	<view>
		<hd-navbar :showHomeIcon="true" :showCartIcon="false" :showInput="false" :showUserIcon="true" title="用户结算" />

		<view class="mt-20">
			<view class="border-t-1 border-b-1 border-t-solid border-b-solid border-gray-100 py-20 px-20">
				收货地址
			</view>
			<view class="py-20 px-20">
				<view class="" v-if="address.length">
					<hd-address-select />
				</view>
				<view class="" v-else>
					<u-button type="success" @click="redirect(`/pages/address/add/add`)">设置收货地址</u-button>
				</view>
			</view>
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
			<view class="" v-if="coupon">
				<view class="border-t-1 border-b-1 border-t-solid border-b-solid border-gray-100 py-20 px-20">
					优惠券
				</view>
				<view class="py-20 px-20">
					<hd-coupon-item :coupon="coupon">
						<button type="default" size="mini" @click="coupon=null">取消优惠券</button>
					</hd-coupon-item>
				</view>
			</view>

			<uni-list>
				<uni-list-item title="优惠券" link clickable @click="couponPopup=true" @select="couponPopup=false"
					v-if="!coupon" />
			</uni-list>
			<u-popup v-model="couponPopup" mode="bottom" :mask-close-able="true">
				<coupon-select @select="selectCoupon"></coupon-select>
				<button type="default" @click="couponPopup=false">取消选择</button>
			</u-popup>
		</view>

		<view class="bg-white flex flex-row h-50 items-stretch hd-cart-footer">
			<view class="flex-1 flex flex-col justify-center items-center">
				<view class="text-base flex flex-col items-center justify-center">
					<view class="text-base text-gray-500">
						共 <text class=""> {{cartGoodsTotalNumber(true)}} </text> 件
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
		onShow() {
			this.loginCheck()
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
			...mapState('cart', {
				cart: state => state.cart,
			}),
			...mapState('address', ['currentAddress', 'address']),
			...mapGetters('cart', {
				cartGoodsTotalPrice: 'totalPrice',
				cartGoodsTotalNumber: 'totalNumber'
			}),
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
				if (!this.currentAddress.id) {
					return uni.showToast({
						title: '请选择收货地址',
						duration: 2000
					});
				}
				const goods = this.cart;
				const coupon = this.coupon;

				await this.$api.post(`order`, {
					goods,
					coupon
				}).then(res => {
					uni.showToast({
						title: '支付成功',
						duration: 2000
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
		z-index: 99;
		border-top: solid 1px #999;
	}
</style>
