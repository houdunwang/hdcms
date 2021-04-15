<template>
	<view class="p-20">
		<hd-swiper :height="300" name="home" class="mb-20"></hd-swiper>
		<!-- 文章列表 -->
		<view>
			 <hd-article v-for="article in articles" :article="article" :key="article.id"></hd-article>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articles:[],
				page:1
			}
		},
		created() {
			this.loadArticle()
		},
		methods:{
			async loadArticle(){
				this.articles = await this.api.get(`content?page=${this.page++}`).then(_=>_.data)
			}
		}
	}
</script>

<style lang="scss">

</style>
