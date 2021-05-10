<template>
	<scroll-view scroll-y="true" style="height: 1000rpx;">
		<view class="m-20" v-for="coupon in list" :key="coupon.id">
			<hd-coupon-item :coupon="coupon" :show-select-button="true">
				<u-button type="primary" @click="$emit('select',coupon)" size="mini">使用优惠券</u-button>
			</hd-coupon-item>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				list: []
			}
		},
		async created() {
			this.list = await this.$api.get(`user/coupon`)
		},

	}
</script>

<style>
</style>
