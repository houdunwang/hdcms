const menus = [
    {
        title: '基本设置',
        icon: 'fab fa-app-store-ios',
        items: [{ title: '模块配置', permission: 'config', route: { name: 'admin.config.edit' } }]
    },
    {
        title: '内容管理',
        icon: 'fas fa-camera',
        items: [
            { title: '分类管理', permission: 'lesson', route: { name: 'admin.lesson.create' } },
            { title: '商品列表', permission: 'lesson', route: { name: 'admin.lesson.create' } },
            { title: '属性规格', permission: 'lesson', route: { name: 'admin.lesson.index' } }
        ]
    },
    {
        title: '用户相关',
        icon: 'fas fa-camera',
        items: [
            { title: '用户评论', permission: 'lesson', route: { name: 'admin.lesson.create' } },
            { title: '订单管理', permission: 'lesson', route: { name: 'admin.lesson.create' } }
        ]
    }
]

export default menus
