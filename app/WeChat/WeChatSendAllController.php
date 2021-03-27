<?php

namespace App\WeChat;

use App\Http\Controllers\Controller;
use App\Http\Resources\WeChatSendAllResource;
use App\Models\WeChatSendAll;
use Illuminate\Http\Request;
use App\Models\Site;
use App\Models\WeChat;
use App\Models\WeChatUser;
use Houdunwang\WeChat\SendAll;
use Illuminate\Contracts\Container\BindingResolutionException;

/**
 * 微信群发消息
 * @package App\WeChat
 */
class WeChatSendAllController extends Controller
{
    public function index(Site $site, WeChat $wechat)
    {
        $messages = $wechat->sendAllMessages()->latest('id')->paginate(10);
        return WeChatSendAllResource::collection($messages);
    }

    public function store(Request $request, Site $site, WeChat $wechat,  WeChatSendAll $message)
    {
        $wechat->sendAllMessages()->create($request->input());
        return $this->message('群发消息保存成功');
    }

    /**
     * 预览消息
     * @param Request $request
     * @param Site $site
     * @param WeChat $wechat
     * @param WeChatSendAll $message
     * @param WeChatUser $user
     * @return mixed
     * @throws BindingResolutionException
     */
    public function preview(Request $request, Site $site, WeChat $wechat,  WeChatSendAll $message, WeChatUser $user)
    {
        // return $message->content + ['touser' => $user->openid];
        app(SendAll::class)->init($wechat)->preview($message->content + ['touser' => $user->openid]);
    }

    public function update(Request $request, Site $site, WeChat $wechat,  WeChatSendAll $message)
    {
        $message->fill($request->input())->save();
        return $this->message('群发消息保存成功');
    }

    public function destroy(Request $request, Site $site, WeChat $wechat,  WeChatSendAll $message)
    {
        $message->delete();
        return $this->message('群发消息删除成功');
    }
}
