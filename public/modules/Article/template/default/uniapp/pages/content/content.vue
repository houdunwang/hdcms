<template>
	<view class="p-20">
		<view class="text-xl mb-30">
			{{article.title}}
		</view>
		<view>
			 <rich-text :nodes="article.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: {}
			}
		},
		async onLoad(option) {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			this.article = await this.api.get(`content/${option.id}`)
			uni.hideLoading()
		},
	}
</script>

<style>

</style>
