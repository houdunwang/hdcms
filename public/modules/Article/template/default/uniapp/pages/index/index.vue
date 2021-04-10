<template>
	<view>
		<hd-category-tab :index="index" @change="change" id="categoryTab"></hd-category-tab>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
		:style="{height:'300rpx'}">
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item"></view>
			</swiper-item>
		</swiper>
		<hd-category-article-swiper :index="index" @change="change" :height="categoryArticleSwiperHeight">
		</hd-category-article-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				categoryArticleSwiperHeight: 600
			}
		},
		async onLoad() {
			const categories = await this.api.get(`category`)
			const info = uni.getSystemInfoSync();
			this.categoryArticleSwiperHeight = info.windowHeight - uni.upx2px(80)-uni.upx2px(300);
		},
		methods: {
			change(index) {
				this.index = index;
				console.log(index);
			}
		}
	}
</script>

<style lang="scss">

</style>
