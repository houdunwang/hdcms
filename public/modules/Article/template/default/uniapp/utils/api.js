const host = `https://e19.houdunren.com/api/Article/site/1`
export default {
	request(data) {
		data.url = `${host}/${data.url}`
		return uni.request(data).then(data => {
			const [error, res] = data;
			if (error) {
				uni.showModal({
					title: '温馨提示',
					content: error ?? '请求失败',
					showCancel: false,
					confirmText: '关闭'
				});
			} else {
				return res.data;
			}
		});
	},
	get(url, params = {}) {
		if (Object.keys(params).length) {
			url += '?' + Object.entries(params).map((v, k) => k + '=' + v).join('&');
		}
		return this.request({
			url
		})
	},
	post(url, data = {}) {
		return this.request({
			url,
			data,
			method: 'POST'
		})
	},
	put(url, data = {}) {
		return this.request({
			url,
			data,
			method: 'PUT'
		})
	},
	delete(url) {
		return this.request({
			url,
			method: 'DELETE'
		})
	},
}
