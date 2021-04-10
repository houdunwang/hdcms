<template>
	<view class="hd-category-article-swiper">
		<swiper @change="change" :current="currentIndex" :style="{height:`${height}px`}" class="swiper">
			<swiper-item v-for="(category,index) in categories" :key="category.id">
				<view class="swiper-item">
					{{category.title}}-{{index}}
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: ['index','height'],
		data() {
			return {
				currentIndex: this.index ?? 0,
				categories: [],
			};
		},
		watch: {
			index(n) {
				this.currentIndex = n
			}
		},
		async created() {
			this.categories = await this.api.get(`category`)
		},
		methods: {
			change(c) {
				const index = c.detail.current;
				this.currentIndex = index;
				this.$emit('change', index)
			}
		}
	}
</script>

<style lang="scss">
	.hd-category-article-swiper {
		
		.swiper{
			// background-color: red;
		}
	}
</style>
