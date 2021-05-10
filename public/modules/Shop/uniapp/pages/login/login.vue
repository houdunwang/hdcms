<template>
	<view>
		<hd-navbar title="会员登录" :back="false" :search-input="false"></hd-navbar>
		<view class="bg-white p-20">
			<u-form :model="form" ref="uForm" label-width="200" :border-bottom="true">
				<u-form-item label="用户名">
					<u-input v-model="form.account" placeholder="请输入登录帐号" />
				</u-form-item>
				<u-form-item label="登录密码">
					<u-input v-model="form.password" type="password" placeholder="请输入登录密码" />
				</u-form-item>
			</u-form>
			<view class="flex mt-30 justify-center">
				<u-button type="primary" @click="submit" class="ml-0 mr-20" style="display: inline-block;">登录</u-button>
				<u-button type="info" @click="submit" class="ml-20 mr-0" style="display: inline-block;">会员注册</u-button>
			</view>
		</view>
		<hd-tabbar></hd-tabbar>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				form: {
					account: 'admin@houdunren.com',
					password: 'admin888',
				},
			}
		},
		methods: {
			...mapActions('user',['login']),
			submit() {
				if (this.form.account == '' || this.form.password == '') {
					return uni.showToast({
						title: '帐号或密码不能为空',
						duration: 2000
					})
				}
				this.login(this.form).then(_ => {
					uni.showToast({
						title: '登录成功',
						duration: 2000
					})
					uni.navigateBack()
				});
			}
		}
	}
</script>

<style>

</style>
