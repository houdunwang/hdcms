<template>
	<view>
		<uni-list>
			<uni-list-item title="已选:">
				<template #footer>
					<view @click="showCart=true">
						{{cartGoods?cartGoods.title: '选择商品'}}
					</view>
				</template>
			</uni-list-item>
			<uni-list-item title="送至:">
				<template #footer>
					<view class="" @click.native="showAddress=true">
						北京市朝阳区
					</view>
				</template>
			</uni-list-item>
		</uni-list>

		<!-- 规格选择 -->
		<u-popup v-model="showCart" mode="bottom" :closeable="true" :mask-close-able="true">
			<rule-select :goods="goods" :products="products" :rules="rules" @change="cartGoods=$event;showCart=false"
				@hide="showCart=false">
			</rule-select>
		</u-popup>

		<!-- 底部tabbar -->
		<footer-bar :goods="goods" :products="products" :rules="rules">
			<template #right>
				<u-button type="error" @click="showCart=true" class="mr-10" size="default">加入购物车</u-button>
				<!-- <u-button type="primary" @click="redirect('/pages/pay/pay')" size="medium">
					去结算
				</u-button> -->
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
			...mapState(['cart']),
			...mapGetters(['cartGoodsTotalPrice'])
		},
		methods: {

		}
	}
</script>

<style>

</style>
