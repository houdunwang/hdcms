<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Socialite;
use App\Models\WeChatUser;
use Auth;

/**
 * 微信登录
 * @package App\Http\Controllers
 */
class WeChatBindController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum']);
    }

    /**
     * 将用户重定向到授权页面
     *
     * @return \Illuminate\Http\Response
     */
    public function bind()
    {
        config(['services.weixinweb.redirect' => route('wechat.bind.callback')]);
        return \Socialite::driver('weixinweb')->redirect();
    }

    /**
     * 获取用户信息
     * @return \Illuminate\Http\Response
     */
    public function bindCallback()
    {
        $info = Socialite::driver('weixinweb')->user();
        $unionid = $info->unionid ?? null;
        if ($unionid) {
            $wechatUser = WeChatUser::where('unionid', $info->unionid)->first();
        } else {
            $wechatUser = WeChatUser::where('openid', $info->getId())->first();
        }
        if ($wechatUser) {
            session()->flash('message', '该微信已经绑定过');
            return redirect('/member/info/wechat');
        }
        WeChatUser::create($info->user + ['user_id' => Auth::id(), 'site_id' => site('id')]);
        return redirect('/member/info/wechat');
    }
}
