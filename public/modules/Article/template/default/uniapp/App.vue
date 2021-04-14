<script>
	export default {
		onLaunch: function() {
			this.$store.dispatch('category');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import url("css/app.scss");
</style>
