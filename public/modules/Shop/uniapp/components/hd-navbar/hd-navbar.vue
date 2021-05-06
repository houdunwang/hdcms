<template>
	<view class="hd-navbar">
		<u-navbar :is-back="back" :title="title" :is-fixed="true">
			<view class="flex flex-row w-full px-20 item-center justify-between">
				<u-icon name="home" class="mr-20" size="40" @click="switchTab('/pages/index/index')"
					v-if="showHomeIcon"></u-icon>
				<view @click="redirect('/pages/search/search')" class="flex-1" v-if="showInput">
					<u-search placeholder="搜索商品" search-icon="search" :show-action="false" :disabled="true"></u-search>
				</view>
				<slot></slot>
				<u-icon name="shopping-cart" class="ml-20" size="40" @click="switchTab('/pages/cart/cart')"
					v-if="showCartIcon"></u-icon>
				<u-icon name="account" class="ml-20" size="40" @click="switchTab('/pages/my/my')" v-if="showUserIcon">
				</u-icon>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		props: {
			back: {
				type: Boolean,
				default: false
			},
			title: String,
			showInput: {
				type: Boolean,
				default: true
			},
			showCartIcon: {
				type: Boolean,
				default: true
			},
			showHomeIcon: {
				type: Boolean,
				default: true
			},
			showUserIcon: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.hd-navbar {}
</style>
