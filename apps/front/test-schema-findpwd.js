var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a, _b;
import { z } from 'zod';
var baseSchema = {
    code: z.string({ error: function () { return ({ message: '验证码不能为空' }); } }),
    password: z.string({ error: function () { return ({ message: "密码不能为空" }); } }).min(5, '密码不能少于5位'),
    password_confirmation: z.string({ error: function () { return ({ message: '确定密码不能为空' }); } }).min(5, '确认密码不能少于5位'),
    captcha: z.string({ error: function () { return ({ message: '输入右侧加法结果' }); } }),
};
var schemaMaps = {
    email: z.object(__assign(__assign({}, baseSchema), { email: z.email({ error: function () { return ({ message: '邮箱格式错误' }); } }) })).refine(function (data) { return data.password === data.password_confirmation; }, {
        message: "两次输入的密码不一致",
        path: ["password_confirmation"],
    }),
    mobile: z.object(__assign(__assign({}, baseSchema), { mobile: z.string({ error: function () { return ({ message: '手机号不能为空' }); } }).regex(/^1[3-9]\d{9}$/, '请输入正确的手机号') })).refine(function (data) { return data.password === data.password_confirmation; }, {
        message: "两次输入的密码不一致",
        path: ["password_confirmation"],
    })
};
var res = schemaMaps.mobile.safeParse({
    mobile: '13800138000',
    code: '1234',
    password: 'password1',
    password_confirmation: 'password12',
    captcha: '12',
});
console.log('Valid inputs but mismatched password:', JSON.stringify((_a = res.error) === null || _a === void 0 ? void 0 : _a.issues, null, 2));
var res2 = schemaMaps.mobile.safeParse({
    password: 'password1',
    password_confirmation: 'password12',
});
console.log('Missing other required fields:', JSON.stringify((_b = res2.error) === null || _b === void 0 ? void 0 : _b.issues, null, 2));
