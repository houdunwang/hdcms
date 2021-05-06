<template>
	<view>
		<hd-navbar :back="true" title="商品列表" :showInput="false" :showHomeIcon="false" :showCartIcon="false"></hd-navbar>
		<view class="flex flex-wrap" v-if="list">
			<hd-goods-item class="w-50-s p-10 box-border" v-for="goods in list" :key="goods.id" :goods="goods">
			</hd-goods-item>
		</view>
		<view class="flex justify-center py-50" v-if="reaching">
			加载中...
		</view>
		<!-- 没有更多 -->
		<u-top-tips ref="uTips" navbar-height="60"></u-top-tips>
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				cid: null,
				reaching: false
			}
		},
		//初始加载
		async onLoad(options) {
			this.cid = options.cid
			uni.showLoading({
				title: '加载中'
			});
			const res = await this.$api.get(`goods?cid=${this.cid}&page=${this.page++}`)
			uni.hideLoading()
			this.list = res.data
		},
		//上拉加载
		async onReachBottom() {
			if (this.reaching) return;
			this.reaching = true
			const res = await this.$api.get(`goods?cid=${this.cid}&page=${this.page++}`)
			this.list = [...this.list, ...res.data];
			if (res.data.length == 0) {
				this.$refs.uTips.show({
					title: '暂无新商品',
					type: 'info',
					duration: '2000'
				})
			}
			setTimeout(() => {
				this.reaching = false
			}, 1000)
		},
		methods: {

		}
	}
</script>

<style></style>
