<template>
	<view>
		<uni-search-bar @confirm="search" @blur="search"></uni-search-bar>
		<view class="p-20">
			<hd-article v-for="(article) in articles" :key="article.id" :article="article"></hd-article>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				articles: []

			}
		},
		methods: {
			async search(e) {
				if (this.loading == true) return;
				this.loading = true
				uni.showLoading({
					title: '加载中..',
					mask: true
				});
				this.articles = await this.api.get(`content?keyword=${e.value}`).then(_ => _.data)
				this.loading = false
				uni.hideLoading()
			}
		}
		
	}
</script>

<style>
</style>
