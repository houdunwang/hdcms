<?php

namespace App\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use CodeService;
use Auth;

/**
 * 发送验证码
 * @package App\Api
 */
class CodeController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'throttle:codeSend']);
    }

    /**
     * 手机验证码
     *
     * @param Request $request
     * @return void
     */
    public function mobile(Request $request)
    {
        $request->validate(
            [
                // 'captcha.content' => ['required', 'captcha_api:' . request('captcha.key') . ',default']
            ],
            [
                'captcha.content.required' => '验证码不能为空',
                'captcha.content.captcha_api' => '验证码输入错误'
            ]
        );

        CodeService::mobile(Auth::user()->mobile);
        return ['message' => '验证码发送成功'];
    }

    /**
     * 邮箱验证码
     *
     * @param Request $request
     * @return void
     */
    public function email(Request $request)
    {
        $request->validate(
            [
                'captcha.content' => ['required', 'captcha_api:' . request('captcha.key') . ',default']
            ],
            [
                'captcha.content.required' => '验证码不能为空',
                'captcha.content.captcha_api' => '验证码输入错误'
            ]
        );

        CodeService::email(Auth::user()->email);
        return ['message' => '验证码发送成功'];
    }
}