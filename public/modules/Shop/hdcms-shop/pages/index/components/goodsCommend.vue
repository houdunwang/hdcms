<template>
	<view class="flex flex-row h-250 bg-white">
		<view class="w-50-s p-5 box-border">
			<image
				src="https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/157905/28/18470/175737/6073f270E255d7d08/c9711fa3e3b0f9c5.jpg!q80.dpg.webp"
				mode="aspectFill" class="h-full w-full"></image>
		</view>
		<view class="w-50-s flex flex-col">
			<view class="flex-1 p-5 box-border">
				<image class="h-full w-full" mode="aspectFill"
					src="https://img11.360buyimg.com/n1/jfs/t1/182697/16/1491/231882/608a98c8E0fd5e4d7/c0e1b0f41179204e.jpg">
				</image>
			</view>
			<view class="flex-1 p-5 box-border">
				<image class="h-full w-full" mode="aspectFill"
					src="https://img14.360buyimg.com/n1/jfs/t1/195136/34/503/234697/608a9907E988347ed/f108bee1c803cd45.jpg">
				</image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods: []
			}
		},
		async created() {
			this.goods = await this.$api.get(`goods/commend`)
		},
		methods: {

		}
	}
</script>

<style>

</style>
