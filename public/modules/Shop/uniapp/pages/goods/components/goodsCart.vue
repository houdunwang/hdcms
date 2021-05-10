<template>
	<view>
		<view @click="showCart=true">
			{{cartGoods?cartGoods.title: '选择商品'}}
		</view>

		<!-- 规格选择 -->
		<u-popup v-model="showCart" mode="bottom" :closeable="true" :mask-close-able="true">
			<rule-select :goods="goods" :products="products" :rules="rules" @change="cartGoods=$event;showCart=false"
				@hide="showCart=false">
			</rule-select>
		</u-popup>

		<!-- 底部tabbar -->
		<footer-bar :goods="goods" :products="products" :rules="rules">
			<template #right>
				<view class="flex">
					<u-button type="error" @click="showCart=true" class="mr-10" size="default">加入购物车</u-button>
					<u-button type="primary" @click="redirect('/pages/pay/pay')" size="default" v-if="totalPrice(true)">
						去结算
					</u-button>
				</view>
			</template>
		</footer-bar>

	</view>
</template>

<script>
	import FooterBar from './footerBar';
	import ruleSelect from './ruleSelect.vue';
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		components: {
			FooterBar,
			ruleSelect
		},
		props: {
			goods: Object,
			products: Array,
			rules: Array
		},
		data() {
			return {
				showCart: false,
				cartGoods: null
			}
		},
		computed: {
			...mapState('cart', {
				state: state => state.cart
			}),
			...mapGetters('cart', [
				'totalPrice'
			])
		},
		methods: {

		}
	}
</script>

<style>

</style>
