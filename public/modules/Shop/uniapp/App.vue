<script>
	import store from '@/store/index.js'
	export default {
		onLaunch: function() {
		},
		onShow: function() {
			store.dispatch('user/getCurrentUser')
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
	@import "css/app.scss";
	@import "css/font-awesome.css";
	@import 'css/iconfont.css';
	@import "uview-ui/index.scss";
</style>
