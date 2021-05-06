<template>
	<view class="box-border" @click="redirect('/pages/goods/goods',{id:goods.id})">
		<image :src="goods.preview" mode="center" class="w-full h-200 rounded-sm shadow-sm"></image>
		<view class="text-base font-bold">{{goods.title}}</view>
		<view class="text-sm mt-10 text-gray-500 description">
			{{goods.description}}
		</view>
		<view class="price flex flex-row mt-10">
			<view class="mr-10 text-red-600">
				<text>¥</text>
				<text>{{goods.price}}</text>
			</view>
			<view class="text-gray-600 line-through">
				<text>¥</text>
				<text>{{goods.market_price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goods'],
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.description {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
</style>
