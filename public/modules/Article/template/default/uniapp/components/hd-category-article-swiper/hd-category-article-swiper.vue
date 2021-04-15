<template>
	<view>
		<!-- 可滑动列表 -->
		<swiper class="swiper" :duration="500" @change="swiperChagne" :current="currentIndex"
			:style="{height:`${swiperHeight}px`}">
			<swiper-item v-for="(category,index) in $store.state.categories" :key="category.id" class="swiper-item">
				<view class="">
					{{category.title}}
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: ['index', 'height'],
		data() {
			return {
				currentIndex: this.index ?? 0,
				swiperHeight: this.height ?? 500,
			};
		},
		watch: {
			index(n) {
				this.currentIndex = n
			}
		},
		async created() {
			
		},
		methods: {
			swiperChagne(c) {
				const index = c.detail.current;
				this.currentIndex = index
				this.$emit('change', index)
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		.swiper-item {
			height: 300rpx;

			&:nth-child(odd) {
				background-color: #dcdcdc;
			}

			&:nth-child(even) {
				background-color: #eee;
			}
		}
	}
</style>
