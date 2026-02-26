export const validateMessage = {
  'maxRowsRule': '{{field}} 不能超过 {{max}} 个',
  // 基础必填
  'required': '{{field}} 不能为空',
  'requiredIf': '当 {{other}} 为 {{value}} 时，{{field}} 不能为空',
  'requiredUnless': '除非 {{other}} 为 {{value}}，否则 {{field}} 不能为空',
  'requiredWith': '当 {{fields}} 存在时，{{field}} 不能为空',
  'requiredWithAll': '当 {{fields}} 都存在时，{{field}} 不能为空',
  'requiredWithout': '当 {{fields}} 不存在时，{{field}} 不能为空',
  'requiredWithoutAll': '当 {{fields}} 都不存在时，{{field}} 不能为空',
  'database.exists': '{{field}} 不存在',
  'database.unique': '{{field}} 已存在，请更换',
  'confirmed': '{{field}} 两次输入不一致',

  // 长度验证
  'maxLength': '{{field}} 最多 {{max}} 个字符',
  'minLength': '{{field}} 最少 {{min}} 个字符',
  'length': '{{field}} 长度必须为 {{length}} 个字符',

  // 数值验证
  'numeric': '{{field}} 必须为数字',
  'integer': '{{field}} 必须为整数',
  'float': '{{field}} 必须为浮点数',
  'min': '{{field}} 最小值为 {{min}}',
  'max': '{{field}} 最大值为 {{max}}',
  'range': '{{field}} 必须在 {{min}} 到 {{max}} 之间',

  // 格式验证
  'email': '{{field}} 邮箱格式不正确',
  'url': '{{field}} 网址格式不正确（需包含 http/https）',
  'ip': '{{field}} IP地址格式不正确（支持 IPv4/IPv6）',
  'uuid': '{{field}} UUID格式不正确',
  'regex': '{{field}} 格式不符合要求（如：{{pattern}}）',
  'json': '{{field}} 必须是有效的 JSON 格式',
  'date': '{{field}} 必须是有效的日期格式',
  'datetime': '{{field}} 必须是有效的日期时间格式',

  // 字符串验证
  'string': '{{field}} 必须为字符串格式',
  'boolean': '{{field}} 必须为布尔值',
  'array': '{{field}} 必须为数组格式',
  'object': '{{field}} 必须为对象格式',
  'equals': '{{field}} 必须等于 {{other}}',
  'in': '{{field}} 必须是 {{options}} 中的一个',
  'notIn': '{{field}} 不能是 {{options}} 中的一个',
  'distinct': '{{field}} 不能包含重复值',

  // 文件验证
  'file': '{{field}} 必须是一个文件',
  'fileSize': '{{field}} 文件大小不能超过 {{size}}{{unit}}（当前：{{actual}}）',
  'fileExt': '{{field}} 文件格式只能是 {{ext}}（支持：{{allowed}}）',
  'fileType': '{{field}} 文件类型只能是 {{type}}（支持：{{allowed}}）',

  // 自定义验证
  'unique': '{{field}} 已存在，请更换',
  'exists': '{{field}} 不存在',
}

export const validateFields = {
  // 基础通用字段
  id: 'ID',
  createTime: '创建时间',
  updateTime: '更新时间',
  deleteTime: '删除时间',
  status: '状态',
  sort: '排序值',
  remark: '备注',
  desc: '描述',
  name: '名称',
  code: '验证码',
  type: '类型',
  label: '标签',
  value: '值',

  // 用户/账号模块
  username: '用户名',
  nickname: '昵称',
  avatar: '头像',
  phone: '手机号',
  mobile: '手机号',
  email: '邮箱',
  password: '密码',
  confirmPassword: '确认密码',
  oldPassword: '原密码',
  newPassword: '新密码',
  realName: '真实姓名',
  gender: '性别',
  birthday: '生日',
  age: '年龄',
  idCard: '身份证号',
  verificationCode: '验证码',
  smsCode: '短信验证码',
  emailCode: '邮箱验证码',
  token: '令牌',
  loginTime: '登录时间',
  loginIp: '登录IP',

  // 内容模块
  title: '标题',
  subtitle: '副标题',
  content: '内容',
  summary: '摘要',
  preview: '预览图',
  cover: '封面图',
  images: '图片',
  video: '视频',
  audio: '音频',
  tags: '标签',
  category: '分类',
  categoryId: '分类ID',
  author: '作者',
  source: '来源',
  views: '浏览量',
  likes: '点赞数',
  comments: '评论数',

  // 产品模块
  productName: '产品名称',
  productCode: '产品编码',
  price: '价格',
  originalPrice: '原价',
  stock: '库存',
  sales: '销量',
  weight: '重量',
  dimension: '尺寸',
  spec: '规格',
  color: '颜色',
  brand: '品牌',
  brandId: '品牌ID',
  sku: 'SKU',
  barCode: '条形码',
  qrCode: '二维码',

  // 地址模块
  province: '省份',
  city: '城市',
  district: '区县',
  address: '详细地址',
  postalCode: '邮政编码',
  receiverName: '收件人姓名',
  receiverPhone: '收件人电话',
  receiverAddress: '收件人地址',

  // 订单模块
  orderNo: '订单号',
  orderAmount: '订单金额',
  paymentAmount: '支付金额',
  paymentType: '支付方式',
  paymentTime: '支付时间',
  deliveryType: '配送方式',
  deliveryTime: '配送时间',
  deliveryNo: '物流单号',
  orderStatus: '订单状态',
  shippingAddress: '收货地址',

  // 文件/媒体模块
  file: '文件',
  fileName: '文件名',
  fileUrl: '文件链接',
  fileSize: '文件大小',
  fileType: '文件类型',
  fileExt: '文件后缀',
  videoUrl: '视频链接',
  audioUrl: '音频链接',

  // 系统/权限模块
  menuName: '菜单名称',
  menuPath: '菜单路径',
  menuIcon: '菜单图标',
  roleName: '角色名称',
  roleDesc: '角色描述',
  permissionName: '权限名称',
  permissionCode: '权限编码',
  configKey: '配置键名',
  configValue: '配置值',
  departmentName: '部门名称',
  positionName: '职位名称',

  // 自定义字段
  captcha: '验证码',
  account: '帐号',
  password_confirmation: '确认密码',
  old_password: '原密码'
}
