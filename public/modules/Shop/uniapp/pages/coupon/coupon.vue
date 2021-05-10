<template>
	<view>
		<hd-navbar title="优惠券" :showInput="false" :showCartIcon="false" :showHomeIcon="false"></hd-navbar>
		<view>
			<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
				swiperWidth="750">
			</u-tabs-swiper>
		</view>
		<hd-loading v-if="loading"></hd-loading>
		<view class="" v-if="!loading">
			<view class="mx-30" v-if="current==0">
				<view class="flex flex-col" v-if="dontHaveList.length">
					<hd-coupon-item :coupon="coupon" v-for="coupon in dontHaveList" :key="coupon.id" class="mb-20"
						@add="load" :show-add-button="true">
						<u-button type="warning" @click="add(coupon)" size="mini">领取优惠券</u-button>
					</hd-coupon-item>
				</view>
				<view class="flex justify-center py-50" v-else>
					暂无优惠券
				</view>
			</view>
			<view class="mx-30" v-else>
				<view v-if="haveList.length" class="flex flex-col">
					<hd-coupon-item :coupon="coupon" v-for="coupon in haveList" :key="coupon.id" class="mb-20">
					</hd-coupon-item>
				</view>
				<view class="flex justify-center py-50" v-else>
					你还没有领取任何优惠券
				</view>
			</view>
		</view>
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
					name: '待领取'
				}, {
					name: '已拥有'
				}],
				current: 0,
				list: [],
				userCoupons: [],
				loading: true
			}
		},
		onShow() {
			this.loginCheck();
		},
		async created() {
			this.load();
		},
		computed: {
			//未拥有的优惠券
			dontHaveList() {
				return this.list.filter(coupon => {
					return !this.userCoupons.some(c => c.id == coupon.id);
				})
			},
			//已经拥有优惠券
			haveList() {
				return this.list.filter(coupon => {
					return this.userCoupons.some(c => c.id == coupon.id);
				})
			}
		},
		methods: {
			tabsChange(index) {
				this.current = index;
			},
			//添加优惠券
			async load() {
				this.loading = true
				this.list = await this.$api.get(`coupon`)
				this.userCoupons = await this.$api.get(`user/coupon`)
				this.loading = false
			},
			async add(coupon) {
				await this.$api.post(`user/coupon`, {
					coupon
				})
				this.load()
				uni.showToast({
					title: '优惠券领取成功',
					duration: 2000
				})
			}
		}
	}
</script>

<style>

</style>
