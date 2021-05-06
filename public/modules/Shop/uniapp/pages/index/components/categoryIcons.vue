<template>
	<view class="flex flex-wrap" style="background-color: #fff;">
		<view v-for="(item,index) in lists" :key="index" class="w-20-s flex justify-center h-80 item-center box-border">
			<view class="flex flex-col item-center justify-center">
				<i class="iconfont" :class="item.icon" style="font-size:70rpx;" :style="{color:item.color}"></i>
				<view class="text-sm mt-10">
					{{item.title}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:[
					{icon:'icon-jiadian1',title:'家电',color:"#6C16B2"},
					{icon:'icon--',title:'家具',color:"#FF3634"},
					{icon:'icon-gouwu-2',title:'超市',color:"#FF9F05"},
					{icon:'icon-diannao',title:'电脑',color:"#6C16B2"},
					{icon:'icon-tongzhuang',title:'童装',color:"#FF3634"},
					{icon:'icon-shengxian-pingguo',title:'生鲜',color:"#FF3634"},
					{icon:'icon-nvzhuang',title:'女装',color:"#6C16B2"},
					{icon:'icon-fuzhuang',title:'男装',color:"#FF3634"},
					{icon:'icon-fuzhuang',title:'男装',color:"#649B16"},
					{icon:'icon-fuzhuang',title:'男装',color:"#FF9F05"},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
