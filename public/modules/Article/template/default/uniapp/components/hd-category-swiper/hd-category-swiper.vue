<template>
	<view class="px-20">
		<view class="hd-category-tab mb-20">
			<scroll-view scroll-x="true" class="scroll-view" :scroll-with-animation="true" :scroll-into-view="activeId"
				:show-scrollbar="false">
				<view v-for="(category,index) in categories" :key="category.id" class="item">
					<view class="title" @click="change(index)" :class="{active:currentIndex==index}"
						:id="`id-${index}`">
						{{category.title}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 显示区域 -->
		<swiper class="swiper" :duration="500" @change="swiperChagne" :current="currentIndex"
			:style="{height:`${swiperHeight}px`}">
			<swiper-item v-for="(category,index) in categories" :key="category.id" class="swiper-item">
				<scroll-view class="" :scroll-y="true" @scrolltolower="scrolltolower"
					:style="{height:`${swiperHeight}px`}">
					<hd-article v-for="article in category.article.list" :key="article.id" :article="article">
					</hd-article>
					<view class="" v-if="category.article.isAll" style="text-align: center;">
						暂无新文章
					</view>
					<view class="py-30" v-if="loading && category.article.isAll==false" style="text-align: center;">
						加载中...
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//当前标签索引
				currentIndex: 0,
				//栏目数据
				categories: [],
				swiperHeight: 500,
				articles: [],
				loading: false,
			}
		},
		computed: {
			activeId() {
				return `id-${this.currentIndex}`
			},
		},
		async created() {
			const categories = await this.api.get(`category`)
			this.categories = categories.map(c => {
				c.article = {
					list: [],
					page: 1,
					isLoad: false,
					isAll: false
				}
				return c;
			})
			const info = uni.getSystemInfoSync();
			this.swiperHeight = info.windowHeight - uni.upx2px(80) - uni.upx2px(20)
			this.initArticle()
		},
		methods: {
			//tab点击
			change(index) {
				this.currentIndex = index
				this.initArticle()
			},
			//内容滑动
			async swiperChagne(c) {
				this.currentIndex = c.detail.current
				this.initArticle()
			},
			//加载栏目文章
			async initArticle() {
				const category = this.categories[this.currentIndex];
				if (category.article.isLoad) return;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				if (category.article.isLoad === false) {
					category.article.list = await this.api.get(`content?category_id=${category.id}`).then(_ => _.data)
					category.article.isLoad = true;
				}
				uni.hideLoading()
			},
			async scrolltolower() {
				if (this.loading) return;
				this.loading = true
				const category = this.categories[this.currentIndex];
				category.article.page++;
				const articles = await this.api.get(`content?category_id=${category.id}&page=${category.article.page}`)
					.then(_ => _.data);
				category.article.list.push(...articles)
				if (articles.length == 0) {
					category.article.isAll = true
				}
				this.loading = false
			}
		}
	}
</script>

<style lang="scss">
	.hd-category-tab {
		.scroll-view {
			white-space: nowrap;
			border-bottom: solid 1px #dedede;
			box-shadow: 0 3px 2px #efefef;

			.item {
				display: inline-block;
				margin-right: 20rpx;

				.title {
					height: 80rpx;
					display: flex;
					align-items: center;
					margin-right: 20rpx;

					&.active {
						border-bottom: solid 2px #0c67d9;
						color: #007AFF;
						font-weight: bold;
						font-size: 30rpx;
					}
				}
			}
		}
	}
</style>
