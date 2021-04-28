export default route => [
    { title: '属性列表', name: 'admin.attribute.index' },
    { title: '添加属性', name: 'admin.attribute.create', query: { tid: route.query.tid } },
    { title: '编辑属性', name: 'admin.attribute.edit', current: true }
]
