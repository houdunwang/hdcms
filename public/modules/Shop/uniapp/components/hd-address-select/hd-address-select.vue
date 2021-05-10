<template>
	<view class="bg-white">
		<view class="flex-1" @click="show = true">
			<view class="" v-if="currentAddress.id">
				{{currentAddress.district}} {{currentAddress.info}}
			</view>
			<view v-else class="flex justify-end flex-1">
				选择地址
			</view>
		</view>

		<!-- 弹出地址选择 -->
		<u-popup v-model="show" mode="center" height="800">
			<view class="p-20">
				<view class="flex justify-center">配送至</view>
				<view class="flex border-b-1 border-b-solid border-gray-200 py-30 px-30" v-for="(a,index) in address"
					:key="index">
					<view class="flex-1 flex flex-col justify-center">
						<radio-group @change="changeAddress">
							<view class="text-base flex items-center mt-10">
								<radio :value="a.id" :checked="a.id==currentAddress.id">
									<view class="w-320">
										{{a.district}} {{a.info}}
									</view>
								</radio>
							</view>
						</radio-group>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				show: false,
			}
		},
		computed: {
			//地址列表与当前选择地址
			...mapState('address', ['address', 'currentAddress']),
		},
		methods: {
			//设置当前使用的地址
			...mapMutations('address', ['setCurrentAddress']),
			changeAddress(payload) {
				this.setCurrentAddress(payload.detail.value)
				this.show = false
			}
		}
	}
</script>

<style>
</style>
