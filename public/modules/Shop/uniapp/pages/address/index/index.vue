<template>
	<view>
		<hd-navbar :back="true" :showHomeIcon="false" :showCartIcon="false" :showInput="false" title="地址管理"></hd-navbar>
		<view class="">
			<view class="flex border-b-1 border-b-solid border-gray-200 py-30 px-30" v-for="(add,index) in address" :key="index">
				<view class="flex-1 flex flex-col justify-center">
					<view class="text-gray-800 font-bold">
						{{add.consignee}}
						{{add.tel}}
					</view>
					<view class="text-sm flex items-center mt-10">
						<u-tag text="默认" size="mini" mode="plain" v-if="add.is_default" class="mr-10" />
						{{add.district}}
						{{add.info}}
					</view>
				</view>
				<view class="text-red-600">
					<navigator :url="`/pages/address/update/update?id=${add.id}`">
						编辑
					</navigator>
				</view>
			</view>
		</view>
		<view class="p-20">
			<u-button type="success" @click="redirect('/pages/address/add/add')">新增地址</u-button>
		</view>
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		computed: {
			...mapState('address', ['address'])
		},
		methods: {

		}
	}
</script>

<style>

</style>
