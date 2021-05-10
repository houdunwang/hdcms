<template>
	<view>
		<view class="p-30">
			<view class="flex">
				<view class="">
					<image :src="goods.preview" mode="aspectFill"
						class="w-60 h-60 border-8 border-solid border-gray-200 overflow-hidden"></image>
				</view>
				<view class="flex flex-col ml-30">
					<view class="text-red-600 text-lg font-bold">
						¥ {{goods.price}}
					</view>
					<view>
						{{goods.description}}
					</view>
				</view>
			</view>
			<!-- 规格 -->
			<view class="mt-30">
				<view class="mb-30" v-for="(rule,index) in rules" :key="rule.id">
					<view class="font-bold text-base mb-20 bloc">{{rule.title}}</view>
					<view class="flex">
						<u-tag :text="attribute.attribute_value" mode="light" class="mr-20" shape="circle"
							v-for="attribute in rule.attributes" :key="attribute.id"
							@click="selectAttribute(attribute.id,index)"
							:type="attributes.includes(attribute.id)?'error':'info'"></u-tag>
					</view>
				</view>
			</view>
			<!-- 购物数量 -->
			<view class="flex justify-between mt-30 items-center">
				<text>购买数量</text>
				<uni-number-box v-model="number" :max="product?product.number:goods.number"></uni-number-box>
			</view>
			<!-- 加入购物车 -->
			<view class="mt-30 mb-30">
				<view class="">
					<u-button type="error" v-if="canAddCart" @click="addCart">加入购物车</u-button>
					<u-button type="info" v-else>请选择规格</u-button>
				</view>
				<view class="mt-20">
					<u-button type="info" @click="$emit('hide')">取消选择</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'

	export default {
		props: {
			goods: Object,
			products: Array,
			rules: Array
		},
		data() {
			return {
				attributes: [],
				number: 1,
			}
		},
		computed: {
			//有效属性
			validAttributeIds() {
				//根据已选择属性判断当前可使用的货品
				//没有选择属性时所有货品均可用
				const products = this.products.filter(p => {
					return this.attributes.filter(a => a != null).every(a => {
						return p.attributeList.includes(a);
					})
				})
				//从可用货品中获取可以使用的规格属性
				const attributes = products.reduce((attrs, p) => {
					return [...attrs, ...p.attributeList]
				}, [])
				return attributes;
			},
			//当前选择的货品
			product() {
				return this.products.find(p => {
					return p.attributes == this.attributes.join('-');
				})
			},
			//是否显示添加购物车按钮
			canAddCart() {
				return this.products.length == 0 || this.product;
			},
			//购物车商品名称
			goodsTitle() {
				if (!this.product) return this.goods.title;
				let title = '';
				this.rules.map(rule => {
					console.log(rule);
					rule.attributes.map(a => {
						if (this.product.attributeList.includes(a.id)) {
							title += a.attribute_value + '-'
						}
					})
				})
				return this.goods.title + ' ' + title.slice(0, -1);
			}
		},
		methods: {
		
			selectAttribute(id, index) {
				if (!this.validAttributeIds.includes(id)) {
					this.attributes = []
				}
				this.$set(this.attributes, index, id)
				//设置购买数量
				this.number = this.product && this.product.number ? 1 : 0;
			},
			addCart() {
				const goods = {
					id: this.goods.id,
					title: this.goodsTitle,
					preview: this.goods.preview,
					goods_id: this.goods.id,
					price: this.goods.price,
					number: this.number,
					goods_sn: this.product ? this.product.sn : this.goods.sn,
					product_id: this.product ? this.product.id : null,
					//库存数量
					goods_number: this.product ? this.product.number : this.goods.number,
					selected: true,
				}
				this.$store.commit('cart/add',goods)
				this.$emit('change', goods)
			}
		}
	}
</script>
