<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500"
			style="height:300rpx" v-if="swiper">
			<swiper-item v-for="(item,index) in swiper.items" :key="index" style="border-radius: 10px;overflow: hidden" @tap="redirect(item.article_id)">
				<image :src="item.img" mode="aspectFill" style="width:100%;"></image>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		props: {
			name: {
				type: String
			}
		},
		data() {
			return {
				swiper: null
			};
		},
		created(){
			this.load()
		},
		methods: {
			async load() {
				this.swiper = await this.api.get(`swiper/${this.name}`);
			},
			redirect(id){
				uni.navigateTo({
					url:`/pages/content/content?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
