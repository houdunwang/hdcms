<template>
	<view>
		<hd-navbar title="优惠券" :showInput="false" :showCartIcon="false" :showHomeIcon="false"></hd-navbar>
		<view>
			<u-tabs-swiper ref="uTabs" :list="tabs" :current="current" @change="tabsChange" :is-scroll="false"
				swiperWidth="750"></u-tabs-swiper>
		</view>
		<view class="mx-30" v-if="current==0">
			<hd-coupon-item :coupon="coupon" v-for="coupon in list" :key="coupon.id" class="mt-30"></hd-coupon-item>
		</view>
		<view class="" v-else>
			{{user.name}}
		</view>
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
					name: '优惠券'
				}, {
					name: '已拥有'
				}],
				current: 0,
				list: []
			}
		},
		onShow() {
			this.loginCheck();
		},
		async created() {
			this.list = await this.$api.get(`coupon`)
		},
		methods: {
			tabsChange(index) {
				this.current = index;
			}
		}
	}
</script>

<style>

</style>
