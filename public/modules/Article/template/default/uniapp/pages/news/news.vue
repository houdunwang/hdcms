<template>
	<view>
		<hd-category-tab :index="index" @change="change" id="categoryTab" class="mb-10"></hd-category-tab>
		<hd-category-article-swiper :index="index" @change="change" :height="categoryArticleSwiperHeight">
		</hd-category-article-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryArticleSwiperHeight:800,
				index:0,
			}
		},
		async onLoad() {
			const categories = await this.api.get(`category`)
			const info = uni.getSystemInfoSync();
			this.categoryArticleSwiperHeight = info.windowHeight - uni.upx2px(80)
		},
		methods: {
			change(index) {
				this.index = index;
			}
		}
	}
</script>

<style>

</style>
