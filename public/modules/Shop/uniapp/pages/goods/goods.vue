<template>
	<view class="goods">
		<hd-loading v-if="loading"></hd-loading>

		<!-- navbar -->
		<hd-navbar :showInput="false" :showUserIcon="true" :showCartIcon="false">
			<view class="flex flex-row w-full px-20 item-center justify-center">
				<view class="flex-1 flex justify-center">
					<view class="w-80-s">
						<u-tabs :list="tab.list" :is-scroll="false" bar-height="6" bar-width="40" bg-color="transparent"
							:current="tab.current" @change="change"></u-tabs>
					</view>
				</view>
			</view>
		</hd-navbar>
		
		<!-- 商品内容 -->
		<view v-if="loading===false">
			<scroll-view ref="scrollView" @scroll="scroll" scroll-y="true" :scroll-into-view="scrollViewId"
				:scroll-with-animation="true" :style="{height:containerHeight+'px'}">
				<!-- 图片轮换 -->
				<view class="" id="id0">
					<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="h-300">
						<swiper-item v-for="(img,i) in goods.images" :key="i">
							<view class="swiper-item">
								<image :src="img" mode="aspectFill" class="w-full h-300"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="mt-20">
					<goods-cart :goods="goods" :products="products" :rules="rules"></goods-cart>
				</view>
				<!-- 商品详情 -->
				<view class="mt-20" id="id1">
					<uni-card title="商品详情" :is-full="true">
						<rich-text :nodes="goods.content.replace(/<img/ig,'<img style=max-width:100%')"></rich-text>
						<!-- <u-parse :html="goods.content"></u-parse> -->
					</uni-card>
				</view>
				<!-- 评论 -->
				<view class="mt-20" id="id2">
					<uni-card title="商品评论" :is-full="true">
						商品评论
					</uni-card>
				</view>
				<!-- 推荐 -->
				<view class="mt-20" id="id3">
					<hd-goods-commend></hd-goods-commend>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	const tab = {
		list: [{
			name: '商品'
		}, {
			name: '详情'
		}, {
			name: '评价',
		}, {
			name: '推荐',
		}],
		current: 0,
	}
	import GoodsCart from './components/goodsCart.vue'
	export default {
		components: {
			GoodsCart
		},
		data() {
			return {
				goods: null,
				tab,
				loading: true,
				//当前内容区域ID
				scrollViewId: '',
				//商品选择
				showCart: false,
				//地址选择
				showAddress: false,
				products: [],
				rules: [],
			}
		},
		computed: {
			//内容scroll-view高度
			containerHeight() {
				return uni.getSystemInfoSync().windowHeight;
			}
		},
		async onLoad(options) {
			this.goods = await this.$api.get(`goods/${options.id}`)
			//货品列表
			this.products = await this.$api.get(`goods/${this.goods.id}/product`)
			//商品规格
			this.rules = await this.$api.get(`goods/${this.goods.id}/product/attributes`)
			this.loading = false
		},
		methods: {
			//更改顶部tab
			change(index) {
				this.tab.current = index;
				this.scrollViewId = `id${index}`
			},
			//区域滚去改变顶部navbar
			scroll(e) {
				const query = uni.createSelectorQuery().in(this);
				for (let i = 0; i < 4; i++) {
					query.select(`#id${i}`).boundingClientRect(data => {
						const top = data.top - uni.getSystemInfoSync().statusBarHeight
						if (top > -1 * data.height && top < 0) {
							this.tab.current = i
						}
					}).exec();
				}
			},
		}
	}
</script>

<style lang="scss">
	.goods {
		.content {
			image {
				max-width: 100%;
			}
		}
	}
</style>
