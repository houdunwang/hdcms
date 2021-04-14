<template>
	<view>
		<uni-search-bar @confirm="confirm"/>
		<view class="p-20">
			<hd-article v-for="article in articles" :key="article.id" :article="article">
			</hd-article>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articles:[]
			}
		},
		methods: {
			async confirm(e){
				this.articles = await this.api.get(`content?keyword=${e.value}`).then(_=>_.data)
			}
		}
	}
</script>

<style>

</style>
