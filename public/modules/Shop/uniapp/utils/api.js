import config from '../config.js'
const host = `${config.host}/api`
export default {
	request(data) {
		if (data.url[0] != '/') {
			data.url = `${host}/Shop/site/${config.site.id}/${data.url}`;
		} else {
			data.url = `${host}${data.url}`;
		}
		data.header = {
			Accept: `application/json`,

		}
		const token = uni.getStorageSync('token');

		if (token) {
			data.header.Authorization = `Bearer ` + uni.getStorageSync('token')
		}

		return uni.request(data).then(data => {
			const [error, res] = data
			if (error || res.statusCode != 200) {
				switch (res.statusCode) {
					case 422:
						let content = Object.entries(res.data.errors).map(([key, e]) => e.join('\n')).join(
							'\r\n');
						uni.showModal({
							title: '提交数据错误',
							content,
							showCancel: false,
							confirmText: '确定'
						})
						break;
					case 401:
						uni.removeStorageSync('token');
						uni.navigateTo({
							url: '/pages/login/login'
						});
						break;
				}
				return Promise.reject(res)
			}
			return res.data
		})
	},
	get(url, params = {}, options = {}) {
		if (Object.keys(params).length) {
			url +=
				'?' +
				Object.entries(params)
				.map((v, k) => k + '=' + v)
				.join('&')
		}
		return this.request({
			url,
			...options
		})
	},
	post(url, data = {}, options = {}) {
		return this.request({
			url,
			data,
			method: 'POST',
			...options
		})
	},
	put(url, data = {}, options = {}) {
		return this.request({
			url,
			data,
			method: 'PUT',
			...options
		})
	},
	delete(url) {
		return this.request({
			url,
			method: 'DELETE'
		})
	}
}
