<template>
	<view class="hd-swiper">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500"
			:style="{height:`${height}rpx`}" v-if="swiper" class="rounded-sm swiper">
			<swiper-item v-for="(item,index) in swiper.items" :key="index">
				<view class="swiper-item" style="overflow: hidden;" @click="redirect(item.article_id)">
					<image :style="{height:`${height}rpx`}" mode="aspectFill" :src="item.img" class="rounded-md" style="overflow:hidden;width:100%"></image>
				</view>
			</swiper-item>
		</swiper>
	
	</view>
</template>

<script>
	export default {
		props: ['name', 'height'],
		data() {
			return {
				swiper: null,
				
			};
		},
		async created() {
			this.swiper = await this.api.get(`swiper/name/${this.name}`)
			
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
/* #ifndef APP-PLUS */
.hd-swiper{
	.swiper{
		margin-bottom: 20rpx;
	}
}
/* #endif */
</style>
