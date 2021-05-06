<template>
	<view class="content">
		<hd-navbar></hd-navbar>
		<!-- 幻灯片 -->
		<hd-swiper class="rounded-md"/>
		<category-icons></category-icons>
		
		<!-- 商品区域 -->
		<goods-commend class="mt-10"></goods-commend>
		
		<!-- 推荐商品 -->
		<!-- <hd-goods-commend class="mt-10"></hd-goods-commend> -->
		<!-- 栏目推荐商品 -->
		<!-- <image mode="aspectFill" class="h-300 w-full mt-10"
			src="https://img13.360buyimg.com/mobilecms/s372x372_jfs/t1/165001/6/12580/148510/604cc6a0Ee488892d/f0ea826dbfa5d2bc.jpg!q70.dpg.webp">
		</image> -->
		<hd-category-commend></hd-category-commend>
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	import HdSwiper from './components/swiper.vue'
	import CategoryIcons from './components/categoryIcons.vue'
	import GoodsCommend from './components/goodsCommend.vue'
	import {mapState} from 'vuex'
	export default {
		components:{CategoryIcons,GoodsCommend,HdSwiper},
		data() {
			return {
				
			}
		},
		computed:{
			...mapState(['user'])
		},
		onLoad() {
		},
	}
</script>

<style>
</style>
