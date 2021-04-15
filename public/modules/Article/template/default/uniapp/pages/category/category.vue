<template>
	<view>
		<hd-category-swiper></hd-category-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:0,
				swiperHeight: 500
			}
		},
		created(){
			const info = uni.getSystemInfoSync();
			this.swiperHeight = info.windowHeight - uni.upx2px(60) ;
		},
		methods:{
			change(index){
				this.index =index
			}
		}
	}
</script>

<style>

</style>
