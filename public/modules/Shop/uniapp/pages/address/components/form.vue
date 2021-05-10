<template>
	<view class="p-30">
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="收货人">
				<u-input v-model="form.consignee" pl />
			</u-form-item>
			<u-form-item label="联系方式">
				<u-input v-model="form.tel" placeholder="请输 联系电话" />
			</u-form-item>
			<u-form-item label="所在地区">
				<u-input type="select" v-model="form.district" :select-open="showSelectPop"
					@click="showSelectPop=true" />
				<u-select v-model="showSelectPop" mode="mutil-column-auto" label-name="text" :list="cityData"
					@confirm="addressConfirm" />
			</u-form-item>
			<u-form-item label="详细地址">
				<u-input v-model="form.info" placeholder="请输入详细收货地址" />
			</u-form-item>
			<u-form-item label="设为默认">
				<u-switch slot="right" v-model="form.is_default"></u-switch>
			</u-form-item>
			<view class="mt-30">
				<u-button type="success" @click="onSubmit" :ripple="true">保存提交</u-button>
				<u-button type="error" @click="del" v-if="form.id" class="mt-20">删除地址</u-button>
			</view>
		</u-form>
	</view>
</template>

<script>
	import cityData from '@/data/picker.city.js'
	import {
		mapActions
	} from 'vuex'

	export default {
		props: ['data'],
		data() {
			return {
				form: Object.assign({}, this.data),
				cityData,
				showSelectPop: false
			};
		},
		methods: {
			...mapActions('address', ['load']),
			//选择所在地区
			addressConfirm(data) {
				this.form.district = data.map(d => d.label).join(' ');
			},
			//删除地址
			async del() {
				try {
					uni.showModal({
						content: '确定删除吗？',
						success: async (res) => {
							await this.$api.delete(`address/${this.form.id}`)
							this.load()
							uni.navigateTo({
								url: '/pages/address/index/index'
							})
						}
					})
				} catch (e) {
					console.log(e);
				}
			},
			//提交地址
			async onSubmit() {
				const url = this.form.id ? `address/${this.form.id}` : `address`;
				try {
					await this.$api[this.form.id ? 'put' : 'post'](url, this.form)
					this.load();
					uni.showToast({
						title: '地址保存成功',
						mask: true,
						success() {
							setTimeout(() => uni.navigateTo({
								url: '/pages/address/index/index'
							}), 1000)
						}
					})
				} catch (e) {

				}

			}
		}
	};
</script>
