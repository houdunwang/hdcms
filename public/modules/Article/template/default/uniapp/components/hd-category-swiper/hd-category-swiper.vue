<template>
	<view class="p-20">
		<view class="hd-category-tab mb-20" id="category-tab">
			<scroll-view scroll-x="true" class="scroll-view" :scroll-with-animation="true" :scroll-into-view="activeId">
				<view v-for="(category,index) in categories" :key="category.id" class="item">
					<view class="title" @click="change(index)" :class="{active:currentIndex==index}"
						:id="`id-${index}`">
						{{category.title}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 可滑动列表 -->
		<swiper class="swiper" :duration="500" @change="swiperChagne" :current="currentIndex"
			:style="{height:`${swiperHeight}px`}">
			<swiper-item v-for="(category,index) in categories" :key="category.id" class="swiper-item">
				<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="scrolltolower"
					:style="{height:`${swiperHeight}px`}">
					<hd-article v-for="(article) in category.article.list" :key="article.id" :article="article">
					</hd-article>
					<view v-if="category.article.loading" style="text-center py-20">
						加载中...
					</view>
					<view v-if="category.article.isAll" style="text-center py-20">
						没有新内容了》。。
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: ['index'],
		data() {
			return {
				//当前标签索引
				currentIndex: this.index ?? 0,
				//栏目数据
				categories: [],
			}
		},
		watch: {
			index(n) {
				this.currentIndex = n;
			}
		},
		computed: {
			activeId() {
				return `id-${this.currentIndex}`
			},
			swiperHeight() {
				const info = uni.getSystemInfoSync()
				return info.windowHeight - uni.upx2px(120);
			}
		},
		async created() {
			const categories = await this.api.get(`category`)
			this.categories = categories.map(c => {
				c.article = {
					list: [],
					page: 1,
					loading: false,
					isAll:false,
				}
				return c;
			})
			this.loadArticle()
		},
		methods: {
			change(index) {
				this.currentIndex = index
				this.initCategoryArticle()
			},
			swiperChagne(c) {
				const index = c.detail.current;
				this.currentIndex = index
				this.initCategoryArticle()
			},
			initCategoryArticle(){
				const category = this.categories[this.currentIndex];
				if (category.article.list.length == 0) {
					this.loadArticle()
				}
			},
			async loadArticle() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				const category = this.categories[this.currentIndex];
				const articles = await this.api.get(
					`content?category_id=${category.id}&page=${category.article.page}`).then(_ => _.data)
				category.article.list.push(...articles)
				uni.hideLoading()
			},
			// 滚动到面板底部
			async scrolltolower() {
				const category = this.categories[this.currentIndex];
				if(category.article.loading )return;
				category.article.page++;
				category.article.loading = true
				const articles = await this.api.get(
					`content?category_id=${category.id}&page=${category.article.page}`).then(_ => _.data)
				category.article.list.push(...articles)
				category.article.loading = false
				category.article.isAll = articles.length==0
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
			height: 60rpx;
			box-sizing: border-box;

			.item {
				display: inline-block;
				margin-right: 20rpx;

				.title {
					height: 60rpx;
					display: flex;
					align-items: center;
					box-sizing: border-box;
						border-bottom: solid 4px #fff;
					&.active {
						color:#0c67d9;
						font-size:30rpx;
						font-weight: bold;
						border-bottom: solid 4px #0c67d9;
					}
				}
			}
		}
	}
</style>
