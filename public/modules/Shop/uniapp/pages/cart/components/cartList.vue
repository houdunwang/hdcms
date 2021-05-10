<template>
	<view class="">
		<view class="bg-white p-30 mt-30" v-if="cart.length">
			<view class="" v-for="(goods,index) in cart" :key="index" class="flex flex-row items-end mt-30">
				<view class="flex self-center">
					<u-checkbox-group :size="40">
						<u-checkbox v-model=" goods.selected" shape="circle" active-color="red" />
					</u-checkbox-group>
				</view>
				<image :src="goods.preview" mode="aspectFill" @click="redirect('/pages/goods/goods',{id:goods.id})"
					class="ml-20 bg-white w-90 h-90 border border-gray-300 border-solid"></image>
				<view class="ml-20 self-end flex-1">
					<view class="text-base">
						{{goods.title}}
					</view>
					<view>
						售价：{{goods.price}}元
					</view>
					<view class="flex items-center justify-between">
						<u-number-box v-model="goods.number" bg-color="#ddd" :min="1" :max="goods.goods_number">
						</u-number-box>
						<i class="iconfont icon-del" @click="remove(goods)"></i>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-else>
			<view class="bg-gray-100 flex flex-col items-center justify-center mt-30 py-80">
				<view class="mb-20 flex items-center">
					<i class="iconfont icon-gouwu-2 text-2xl mr-20 text-gray-400"></i>
					购物车还是空的
				</view>
				<navigator url="/pages/category/category" open-type="switchTab">
					<button type="default">去逛逛</button>
				</navigator>
			</view>
			<view class="">
				<!-- 推荐商品 -->
				<hd-goods-commend class="mt-30"></hd-goods-commend>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {}
		},
		computed: {
			...mapState('cart', {
				'cart': state => state.cart
			})
		},
		methods: {
			...mapMutations('cart', {
				removeCartGoods: 'remove'
			}),
			remove(goods) {
				uni.showModal({
					content: '确定删除吗',
					success: (res) => {
						if (res.confirm) {
							this.removeCartGoods(goods)
						}
					}
				});
			}
		}
	}
</script>

<style>

</style>
