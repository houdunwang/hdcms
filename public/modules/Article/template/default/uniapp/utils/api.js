const host = `https://dev.hdcms.com/api/Article/site/1`;

export default {
	async request(data={}){
		data.url = `${host}/${data.url}`
		return uni.request(data).then(response=>{
			const [error,data] = response
			if(error){
				return uni.showModal({
				    title: '友情提示',
				    content: error??'请求失败',
					showCancel:false,
					confirmText:'关闭'
				});
			}
			return data.data
		})
	},
	get(url,params={}){
		url+=Object.entries(params).map((v,k)=>k+'='+v).join('&');
		return this.request({
			url
		})
	},
	post(url,data){
		this.request({
			url,data
		})
	}
}