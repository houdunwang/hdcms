<?php

namespace App\WeChat;

use App\Http\Controllers\Controller;
use App\Http\Resources\WeChatResource;
use App\Http\Requests\WeChatRequest;
use Houdunwang\WeChat\Message;
use Illuminate\Http\Request;
use App\Models\WeChat;
use App\Models\Site;
use Exception;

/**
 * 站点微信公众号
 * @package App\Api
 */
class WeChatController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'site']);
        $this->authorizeResource(WeChat::class, 'wechat');
    }

    /**
     * 公众号列表
     * @param Request $request
     * @param Site $site
     * @return mixed
     */
    public function index(Request $request, Site $site)
    {
        return WeChatResource::collection($site->wechats);
    }

    /**
     * 获取公众号
     * @param Request $request
     * @param Site $site
     * @param WeChat $wechat
     * @return WeChat
     */
    public function show(Request $request, Site $site, WeChat $wechat)
    {
        return new WeChatResource($wechat);
    }

    /**
     * 保存公众号
     *
     * @param WeChatRequest $request
     * @param Site $site
     * @param WeChat $wechat
     * @param Message $message
     * @return void
     */
    public function store(WeChatRequest $request, Site $site, WeChat $wechat, Message $message)
    {
        try {
            $wechat->site_id = $site->id;
            $wechat->fill($request->all())->save();
            return $this->message('公众号添加成功', new WeChatResource($wechat));
        } catch (Exception $e) {
            return $this->error('appid或appsecret配置错误', 403);
        }
    }

    /**
     * 更新公众号
     *
     * @param WeChatRequest $request
     * @param WeChat $wechat
     * @return void
     */
    public function update(WeChatRequest $request, Site $site, WeChat $wechat)
    {
        $wechat->fill($request->all())->save();
        return $this->message('公众号修改成功', new WeChatResource($wechat));
    }

    /**
     * 删除公众号
     *
     * @param Site $site
     * @param WeChat $wechat
     * @return void
     */
    public function destroy(Site $site, WeChat $wechat)
    {
        $wechat->delete();
        return $this->message('公众号删除成功');
    }
}
