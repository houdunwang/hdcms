<template>
	<view>
		<hd-navbar title="订单" :showInput="false"></hd-navbar>
		<view class="pt-250 text-gray-800 text-lg flex flex-col justify-center items-center">
			<view class="flex items-center flex-col text-red-600 justify-center text-xl">
				<u-icon name="checkmark-circle" size="150" class="mr-20"></u-icon> 
				<text class="text-gray-500">订单提交成功</text>
			</view>
			<button type="primary" class="mt-30" size="mini">返回首页</button>
		</view>
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
