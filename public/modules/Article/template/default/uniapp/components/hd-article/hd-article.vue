<template>
	<view>
		<view v-if="article.images.length<3" class="flex border-gray-200 border-0 border-b-1 border-solid pb-20 mb-30" @click="redirect(article.id)">
			<view class="flex-1 mr-20">
				{{article.description}}
			</view>
			<view class="w-250 h-250">
				<image :src="article.images[0]" mode="aspectFill" class="w-220 h-220 rounded-md"></image>
			</view>
		</view>
		<view v-else class="flex flex-col border-gray-200 border-0 border-b-1 border-solid pb-20 mb-30"  @click="redirect(article.id)">
			<view class="flex-1 mr-20 mb-10">
				{{article.description}}
			</view>
			<view class="flex justify-between flex-1">
				<view class="w-230 h-250" v-for="(img,index) in article.images" :key="index" style="overflow: hidden;"  v-if="index<3">
					<image :src="img" mode="aspectFill" class="w-220 h-220 rounded-md"></image>
				</view>
			</view>
		</view> 
		
	</view>
</template>

<script>
	export default {
		props:['article'],
		data() {
			return {
				
			};
		},
		methods:{
			 redirect(id){
				 uni.navigateTo({
				 	url: `../../pages/content/content?id=${id}`
				 });
			 }
		}
	}
</script>

<style lang="scss">

</style>
