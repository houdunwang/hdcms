<?php

namespace App\Api;

use App\Http\Controllers\Controller;
use App\Models\Site;
use App\Models\WeChat;
use Illuminate\Http\Request;

/**
 * 微信默认消息
 * @package App\Api
 */
class WeChatDefaultController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum']);
    }

    /**
     * 更新消息
     * @param Request $request
     * @param Site $site
     * @param WeChat $wechat
     * @return void
     */
    public function update(Request $request, Site $site, WeChat $wechat)
    {
        $this->authorize('update', $site);

        $request->validate(['welcome' => ['required'], 'default_message' => ['required']], [
            'welcome.required' => '关注欢迎消息不能为空',
            'default_message.required' => '默认回复消息不能为空'
        ]);

        $wechat->fill($request->all())->save();
        return $this->message('默认回复设置成功');
    }
}
