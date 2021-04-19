const menus = [
    {
        title: '模块配置',
        icon: 'fab fa-app-store-ios',
        items: [{ title: '网店配置', permission: 'config', route: { name: 'admin.config.edit' } }]
    },
    {
        title: '商品管理',
        icon: 'fas fa-camera',
        items: [
            { title: '分类管理', permission: 'category', route: { name: 'admin.category.index' } },
            { title: '商品列表', permission: 'goods', route: { name: 'admin.goods.index' } },
            { title: '商品回收站', permission: 'trash', route: { name: 'admin.trash.index' } }
        ]
    },
    {
        title: '其他数据',
        icon: 'fas fa-camera',
        items: [
            { title: '属性分类', permission: 'attribute_type', route: { name: 'admin.attribute_type.index' } },
            { title: '品牌管理', permission: 'brand', route: { name: 'admin.brand.index' } },
            { title: '用户评论', permission: 'lesson', route: { name: 'admin.comment.index' } },
            { title: '供货商', permission: 'supplier', route: { name: 'admin.supplier.index' } }
        ]
    },
    {
        title: '订单管理',
        icon: 'fas fa-camera',
        items: [
            { title: '订单管理', permission: 'order', route: { name: 'admin.order.index' } },
            { title: '发货订单', permission: 'deliver', route: { name: 'admin.deliver.index' } }
        ]
    }
]

export default menus
