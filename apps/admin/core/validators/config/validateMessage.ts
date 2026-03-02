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
	'number': '{{field}} 必须为数字',
	'file.size': '{{field}} 大小不能超过 {{size}}',
}
