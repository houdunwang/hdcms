<?php

namespace App\Http\Controllers\Auth;

use App\Rules\CodeRule;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use App\Rules\AccountRule;
use UserService;
use CodeService;

/**
 * 会员登录
 * @package App\Http\Controllers\Auth
 */
class RegisterController extends Controller
{
    public function __construct()
    {
        $this->middleware('guest')->only('show');
    }

    /**
     * 登录界面
     *
     * @param Request $request
     * @return void
     */
    public function show(Request $request)
    {
        return inertia('Auth/Register/Show');
    }

    /**
     * 保存数据
     *
     * @param Request $request
     * @param User $user
     * @return void
     */
    public function register(Request $request, User $user)
    {
        $request->validate(
            [
                'account' => ['required', Rule::unique('users', 'mobile'), new AccountRule(request('account'))],
                'code' => ['required', new CodeRule($request->account)],
                'password' => ['required', 'between:5,20', 'confirmed'],
            ],
            [
                'account.required' => '帐号不能为空', 'account.unique' => '帐号已经存在',
                'code.required' => '验证码不能为空',
                'password.required' => '密码不能为空', 'password.between' => '密码长度为5～20个字符', 'password.confirmed' => '两次密码输入不一致'
            ]
        );

        $user->password = $request->password;
        $user[UserService::account()] = $request->account;
        $user->save();

        Auth::login($user);

        return inertia()->location('/');
    }

    /**
     * 发送验证码
     *
     * @param Request $request
     * @return void
     */
    public function code(Request $request)
    {
        $userExists = (User::where(UserService::account(), request('account')))->exists();
        if ($userExists) {
            return back()->with('error', '用户已经存在');
        }

        $request->validate(
            [
                'account' => ['required', new AccountRule(request('account'))],
                'captcha' => ['required', 'captcha']
            ],
            [
                'account.required' => '帐号不能为空',
                'captcha.required' => '图形验证码不能为空', 'captcha.captcha' => '验证码输入错误'
            ]
        );
        CodeService::send(request('account'));

        return back()->with('success', '验证码发送成功');
    }
}
