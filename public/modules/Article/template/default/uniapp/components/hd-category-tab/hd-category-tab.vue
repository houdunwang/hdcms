<template>
	<view class="hd-category-tab">
		<scroll-view scroll-x="true" class="scroll-view" :scroll-with-animation="true"
			:scroll-into-view="activeId">
			<view v-for="(category,index) in $store.state.categories" :key="category.id" class="item">
				<view class="title" @click="change(index)" :class="{active:currentIndex==index}" :id="`id-${index}`">
					{{category.title}}
				</view>
			</view>
		</scroll-view>
		<slot />

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
				// categories: [],
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
			}
		},
		async created() {
			// this.categories = await this.api.get(`category`)
			// setTimeout(()=>{
			// 	console.log(this.$store.state.categories);
			// },2000)
		},
		methods: {
			change(index) {
				this.currentIndex = index
				this.$emit('change', index)
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
					height: 60rpx;
					display: flex;
					align-items: center;

					&.active {
						border-bottom: solid 2px #0c67d9;
					}
				}
			}
		}
	}
</style>
