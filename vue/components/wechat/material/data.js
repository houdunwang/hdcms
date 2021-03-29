//素材表单
const material = {
    wechat_id: null,
    module_id: null,
    title: '',
    duration: 'short',
    file: '',

    type: 'image',
    content: [],
    description: {
        title: '',
        introduction: ''
    }
}
//素材类型
const types = [
    { title: '图片素材', type: 'image' },
    { title: '语音素材', type: 'voice' },
    { title: '视频素材', type: 'video' },
    { title: '缩略图素材', type: 'thumb' },
    { title: '图文素材', type: 'news' }
]
//表格列
const columns = [
    { label: '编号', id: 'id', width: 60 },
    { label: '素材说明', id: 'title' }
]
//图文消息文章
const article = {
    // key: Math.random(),
    id: null,
    title: '',
    thumb_media_id: '',
    author: '',
    digest: '',
    show_cover_pic: 1,
    pic: '',
    content: '',
    content_source_url: '',
    need_open_comment: 1,
    only_fans_can_comment: 1
}

export { types, columns, article }
