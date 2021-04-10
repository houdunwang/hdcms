<template>
	<view class="hd-category-tab">
		<scroll-view scroll-x="true" class="scroll-view" :scroll-into-view="activeId" :scroll-with-animation="true"
		>
			<view v-for="(category,index) in categories" :key="category.id" class="scroll-item" :id="`id-${index}`"
				@click="change(index)"
				>
				<view class="title" :class="{active:index==currentIndex}">
					{{category.title}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:['index'],
		data() {
			return {
				categories: [],
				currentIndex: this.index??0,
			};
		},
		watch:{
			index(n){
				this.currentIndex=n
			}
		},
		computed: {
			activeId() {
				return `id-${this.currentIndex}`
			}
		},
		async created() {
			this.categories = await this.api.get(`category`)
		},
		methods:{
			change(index){
				this.currentIndex=index
				this.$emit('change',index)
			}
		}
	}
</script>

<style lang="scss">
	.hd-category-tab {
		box-shadow: 0 3px 6px 0px #E4E7ED ;
		.scroll-view {
			white-space: nowrap;
			border-bottom: solid 1px #ececec;

			.scroll-item {
				margin-right: 10px;
				display: inline-block;

				.title {
					display: flex;
					align-items: center;
					font-size: 30rpx;
					height: 80rpx;
					border-bottom-width: 3px;
					border-color: transparent;

					&.active {
						border-bottom: solid 3px #007AFF;
						color:#007AFF;
						font-weight: bold;
						font-size: 35rpx;
					}
				}
			}
		}
	}
</style>
