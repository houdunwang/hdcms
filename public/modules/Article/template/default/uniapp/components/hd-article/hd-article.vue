<template>
	<view>
		<view class="mb-30">
			<view class="flex justify-between border-b-1 border-gray-200 pb-20"
				v-if="article.images.length<3" @tap="redirect(article.id)">
				<view class="flex-1">
					{{article.description}}
				</view>
				<image :src="article.images[0]" mode="aspectFill" class="h-200 w-230 overflow-hidden"></image>
			</view>
			<view class="flex flex-col border-b-1 border-gray-200 pb-20" v-else  @tap="redirect(article.id)">
				<view class="flex-1 mb-20">
					{{article.description}}
				</view>
				<view class="flex justify-between">
					<view v-for="(image,index) in article.images" :key="index" v-if="index<3" class="overflow-hidden">
						<image :src="image" mode="aspectFill" class="h-200 w-230"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['article'],
		data() {
			return {}
		},
		methods:{
			redirect(id){
				return uni.navigateTo({
					url: `/pages/content/content?id=${id}`,
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
