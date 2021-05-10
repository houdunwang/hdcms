<template>
	<view class="">
		<scroll-view scroll-y="true" style="height: 1000rpx;">
			<view class="m-20">
				<hd-coupon-item :coupon="coupon" v-for="coupon in list" :key="coupon.id" class="mt-30"
					:show-select-button="true">
					<u-button type="primary" @click="$emit('select',coupon)" size="mini">使用优惠券</u-button>
				</hd-coupon-item>
			</view>
		</scroll-view>
		
	</view>
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
