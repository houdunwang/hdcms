<template>
	<view class="bg-white flex py-50 border-t-10 border-opal border-solid rounded-md shadow-sm">
		<view class="flex flex-col justify-center w-35-s">
			<view class="flex justify-center text-2xl font-extrabold text-red-600">
				{{coupon.valueTitle}}
			</view>
			<view class="flex justify-center">
				满{{coupon.amount.replace('.00','')}}元可用
			</view>
		</view>
		<view class="flex flex-col flex-1 items-center justify-center">
			<view>
				{{coupon.formatTitle}}
			</view>
			<view>
				{{coupon.formatTime}}
			</view>
			
			<view class="px-30 flex items-center mt-20">
				<u-button type="warning">领取优惠券</u-button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: ['coupon'],
		computed: {
			
		},
		methods: {

		}
	}
</script>

<style>

</style>
