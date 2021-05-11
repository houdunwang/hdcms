<template>
	<view>
		<u-navbar back-text="返回" :is-fixed="true">
			<u-search placeholder="请输入商品关键词" v-model.trim="keyword" search-icon="search" @change="change"
				@search="search" @custom="search">
			</u-search>
		</u-navbar>

		<view class="" v-if="!lists.length">
			<view class="flex justify-between items-center p-30">
				<view class="font-bold">
					搜索历史
				</view>
				<uni-icons type="trash" @click="clearAll"></uni-icons>
			</view>

			<view class="flex flex-wrap">
				<view class="box-border p-10" v-for="(h,index) in history" :key="index">
					<u-tag :text="h" type="info" shape="circle" closeable @close="closeSearchTag(index)" @click="search(h)"/>
				</view>
			</view>
		</view>

		<uni-card title="搜索结果" :is-full="true" v-else>
			<view class="flex flex-wrap">
				<hd-goods-item v-for="goods in lists" :goods="goods" :key="goods.id" class="w-50-s box-border p-5" />
			</view>
		</uni-card>

		<view class="" v-if="isSearch && lists.length==0">
			<view class="p-30 flex justify-center text-lg items-center">
				<u-icon name="error-circle-fill mr-10" /> 没有搜索到商品
			</view>
			<hd-goods-commend></hd-goods-commend>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				lists: [],
				history: [],
				isSearch: false
			}
		},
		onShow() {
			this.history = uni.getStorageSync('search-history') || []
		},
		methods: {
			//修改搜索结果
			change(w) {
				if (!w) {
					this.lists = []
					this.isSearch=false
				}
			},
			//搜索提交
			async search(w) {
				//记录搜索词
				this.recordKeyword(w);
				this.$api.get(`search/goods?w=${this.keyword}`).then(res => {
					this.lists = res
					this.isSearch = true
				}).catch(e => {})
			},
			//删除搜索结果标签
			closeSearchTag(i) {
				this.history.splice(i, 1);
				uni.setStorageSync('search-history', this.history);
			},
			//记录搜索关键词
			recordKeyword(w) {
				if (!this.history.includes(w)) {
					this.history.push(w)
					uni.setStorageSync('search-history', this.history);
				}
			},
			//删除所有搜索结果
			clearAll() {
				uni.setStorageSync('search-history', this.history = []);
			}
		}
	}
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
</style>
