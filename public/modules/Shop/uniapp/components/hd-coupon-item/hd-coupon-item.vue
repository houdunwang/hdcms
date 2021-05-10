<template>
	<view class="bg-white flex py-20 border-t-5 border-opal border-solid rounded-md shadow-sm">
		<view class="flex flex-col justify-center w-35-s">
			<view class="flex justify-center text-lg font-extrabold text-red-600">
				{{coupon.valueTitle}}
			</view>
			<view class="flex justify-center text-sm text-gray-500">
				满{{coupon.amount.replace('.00','')}}元可用
			</view>
		</view>
		<view class="flex flex-col flex-1 items-center justify-center">
			<view>
				{{coupon.formatTitle}}
			</view>
			<view class="text-sm">
				{{coupon.formatTime}}
			</view>
			<view class="px-30 flex items-center mt-10">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			coupon: Object,
			showAddButton: {
				default: false
			},
			showSelectButton: {
				default: false
			},
		},
		computed: {},
		methods: {
			
		}
	}
</script>

<style>

</style>
