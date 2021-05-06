<template>
	<view>
		<hd-loading v-if="loading"></hd-loading>
		<hd-navbar></hd-navbar>
		<view class="" v-if="categories">
			<view class="flex item-stretch" :style="{height:`${height}px`}">
				<view class="w-80">
					<scroll-view scroll-y="true" class="category h-full">
						
						<view v-for="category in categories" :key="category.id"
							class="py-20 flex item-center justify-center" @click="pid = category.id"
							:class="{'bg-red-500 text-white': pid==category.id}">
							{{category.title}}
						</view>
					</scroll-view>
				</view>
				<view class="bg-white flex-1 p-20 item-stretch" v-if="current">
					<scroll-view scroll-y="true" class="h-full">
						<view class="flex flex-wrap">
							<view v-for="category in current.children" :key="category.id"
								class="w-33-s box-border p-15 mb-30 justify-center">
								<navigator :url="`/pages/goods-list/goods-list?cid=${category.id}`">
								<image :src="category.preview" mode="aspectFill" class="w-full h-50 rounded-sm"></image>
								<view class="flex justify-center">
									{{category.title}}
								</view>
								</navigator>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categories: null,
				pid: 0,
				loading: true
			}
		},
		computed: {
			height() {
				return uni.getSystemInfoSync().windowHeight - 64
			},
			current() {
				return this.categories[this.pid]
			}
		},
		async created() {
			this.categories = await this.$api.get(`category/all_chilren`)
			this.pid = this.categories[0].id
			this.loading = false
		},
	}
</script>

<style lang="scss">
	.category {
		background: #FEFEFE;
		border-right: solid 1px #dcdcdc;
		box-sizing: border-box;
	}
</style>
