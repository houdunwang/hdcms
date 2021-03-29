//消息类型
const types = [
    { title: '文本消息', type: 'text' },
    { title: '图文消息', type: 'news' },
    { title: '图片消息', type: 'image' },
    { title: '音频消息', type: 'voice' },
    { title: '视频消息', type: 'video' },
    { title: '模块处理', type: 'module' }
]
//表格列表
const columns = [
    { label: '编号', id: 'id', width: 60 },
    { label: '规则描述', id: 'title' },
    { label: '关键词', id: 'keyword' }
]
//图文消息内容
const article = {
    title: '',
    picurl: '',
    url: '',
    description: ''
}
export { types, columns, article }
