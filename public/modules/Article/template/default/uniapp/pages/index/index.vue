<template>
	<view>
		<hd></hd>
		
		
		<scroll-view scroll-x="true" class="scroll-x" style="white-space: nowrap;margin-top:80rpx" :scroll-into-view="scrollId" id="top"
			ref="topScrollView">
			<view v-for="item in 30" :key="item" :id="`id-${item}`"
				style="display: inline-block; width: 150rpx;height: 150px;background-color: #007AFF;margin-right: 10rpx;"
				@click="toggleScrollView(item)">
				{{ item }}
			</view>
		</scroll-view>
		
		<scroll-view scroll-x="true" class="scroll-x" style="white-space: nowrap;" :scroll-into-view="scrollId">
			<view v-for="item in 30" :key="item" :id="`id-${item}`"
				style="display: inline-block; width: 80px;height: 80px;background-color: #18B566;margin-right: 10rpx;"
				@click="toggleScrollView(item)">
				{{ item }}
			</view>
		</scroll-view> 


		<swiper class="swiper" :current="swiperId" @change="swiperId=$event.detail.current"
			style="background-color: red;" :style="{'height':`${swiperHeight}px`}">
			<swiper-item>
				<view class="swiper-item uni-bg-red">A</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-green">B</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-blue">C</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				swiperId: 1,
				swiperHeight:200
			}
		},
		onReady() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#top').boundingClientRect(data => {
				const info = uni.getSystemInfoSync()
				this.swiperHeight = info.windowHeight-data.height-80-data.top
			}).exec();
		},
		computed: {
			scrollId() {
				return 'id-' + this.swiperId
			}
		},
		methods: {
			toggleScrollView(index) {
				this.swiperId = index
			}
		}
	}
</script>

<style lang="scss">

</style>
