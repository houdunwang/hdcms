<template>
	<view class="p-20 overflow-hidden">
		<view class="" v-if="article">
			<view class="text-lg mb-20">
				{{article.title}}
			</view>
			<rich-text :nodes="article.content" style="overflow: hidden;" class="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: null,
			}
		},
		async onLoad(e) {
			
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.article = await this.api.get(`content/${e.id}`)
			uni.hideLoading()
		},
		created() {},
		methods: {
			async load() {
				// this.articles = await this.api.get(`content?page=${this.page}`)
			}
		}
	}
</script>

<style lang="scss">
	.content {}
</style>
