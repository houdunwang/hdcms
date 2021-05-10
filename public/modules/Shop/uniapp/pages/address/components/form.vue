<template>
	<view class="p-20 bg-white">
		<hd-navbar></hd-navbar>
		<u-form :model="form" ref="uForm" label-width="150">
			<u-form-item label="收货人">
				<u-input v-model="form.consignee" />
			</u-form-item>
			<u-form-item label="联系方式">
				<u-input v-model="form.tel" />
			</u-form-item>
			<u-form-item label="所在地区">
				<u-input v-model="form.district" />
				<div slot="right">
					<hd-address-select @confirm="selectDistrict">
						<u-icon name="arrow-right"></u-icon>
					</hd-address-select>
				</div>
			</u-form-item>
			<u-form-item label="详细地址">
				<u-input v-model="form.info" />
			</u-form-item>
			<u-form-item label="设为默认">
				<u-switch slot="right" v-model="form.is_default"></u-switch>
			</u-form-item>
			<view class="" v-html="form"></view>
		</u-form>
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					consignee: '',
					district: '',
					info: '',
					tel: '',
					is_default: false
				},
			};
		},
		methods:{
			//选择所在地区
			selectDistrict(data){
				this.form.district = data.map(d=>d.label).join(' ');
			}
		}
	};
</script>
