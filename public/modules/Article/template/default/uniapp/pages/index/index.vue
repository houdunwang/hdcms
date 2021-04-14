<template>
	<view class="p-20" style="">
		<scroll-view class="" :scroll-y="true" @scrolltolower="scrolltolower" :style="{height:`${scrollViewHeight}px`}">
			<hd-swiper name="home" class="mb-30" ></hd-swiper>
			<hd-article v-for="(article,index) in articles" :key="index" :article="article"></hd-article>
		</scroll-view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				articles: [],
				page: 1
			}
		},
		computed: {
			scrollViewHeight() {
				const info = uni.getSystemInfoSync()
				return info.windowHeight
			}
		},
		onLoad: function(options) {
			// uni.startPullDownRefresh();
			this.scrolltolower()
		},
		async onPullDownRefresh() {
			// const articles = await this.api.get(`content?page=${++this.page}`).then(_ => _.data)
			// this.articles.unshift(...articles)
			// uni.stopPullDownRefresh();
		},
		methods: {
			async scrolltolower() {
				console.log(this.page);
				const articles = await this.api.get(`content?page=${this.page++}`).then(_ => _.data)
				this.articles.unshift(...articles)
			}
		}
	}
</script>

<style lang="scss">

</style>
