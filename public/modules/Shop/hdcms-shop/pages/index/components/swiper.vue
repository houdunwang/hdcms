<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="h-150">
			<swiper-item v-for="(slide ,index) in slides" :key="index" class="w-full overflow-hidden">
				<image :src="slide.img" mode="aspectFill" class="w-full h-150"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const slides = [
		{img:'/static/swiper/1.jpg'},
		{img:'/static/swiper/2.jpg'},
		{img:'/static/swiper/3.jpg'},
	]
	export default {
		data() {
			return {
				slides
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
