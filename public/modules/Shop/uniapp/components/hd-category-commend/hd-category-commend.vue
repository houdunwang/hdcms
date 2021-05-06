<template>
	<view>
		<view v-for="(category) in categories" :key="category.id" class="mt-10">
			<uni-card :title="category.title" :isFull="true">
				<view class="flex flex-row flex-wrap">
					<hd-goods-item class="w-50-s p-10 box-border" :goods="goods" v-for="goods in category.goods" :key="goods.id"></hd-goods-item>
				</view>
			</uni-card>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categories: []
			}
		},
		async created() {
			this.categories = await this.$api.get(`category/goods_list`)
		},
		methods: {

		},
	}
</script>

<style>

</style>
