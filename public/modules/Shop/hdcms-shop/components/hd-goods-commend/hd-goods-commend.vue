<template>
	<view>
		<uni-card title="推荐商品" :is-full="true" >
			<view class="flex flex-wrap">
			<hd-goods-item v-for="goods in lists" :goods="goods" :key="goods.id" class="w-50-s box-border p-5"></hd-goods-item>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[]
			}
		},
			
		async mounted(){
			this.lists = await this.$api.get(`goods/commend`)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
