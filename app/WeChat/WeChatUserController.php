<?php

namespace App\WeChat;

use App\Http\Controllers\Controller;
use App\Models\WeChat;
use Houdunwang\WeChat\User as WeChatUser;
use App\Models\Site;
use App\Models\User;
use WeChatService;

/**
 * 微信粉丝
 * @package App\Http\Controllers\WeChat
 */
class WeChatUserController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'site']);
    }

    /**
     * 站点粉丝列表
     * @param WeChat $wechat
     * @return mixed
     */
    public function search(Site $site, WeChat $wechat)
    {
        $this->authorize('update', $wechat);
        $users = User::whereHas('wechatUser', function ($query) use ($site, $wechat) {
            $query->where('site_id', $site['id'])->where('wechat_id', $wechat['id']);
        })
            ->with('wechatUser')
            ->limit(10)
            ->get();

        return $users;
    }

    /**
     * 同步粉丝数据
     * @param WeChat $wechat
     * @param WeChatUser $userPackage
     * @return void
     */
    public function sync(Site $site, WeChat $wechat, WeChatUser $userPackage)
    {
        $this->authorize('update', $wechat);
        //获取粉丝
        $response = $userPackage->init($wechat)->getList(request('next_openid'));
        if (isset($response['data'])) {
            //获取粉丝资料
            $users = $userPackage->getByOpenids($response['data']['openid'])['user_info_list'];
            //同步到数据库
            foreach ($users as $user) {
                WeChatService::saveUser($user + ['wechat_id' => $wechat['id']],);
            }
        }
        // $next_openid = Cache::get($cacheName);
        return $this->message(
            $response['next_openid'] ? '准备同步下一批粉丝...' : '粉丝同步完毕',
            ['next_openid' => $response['next_openid']]
        );
    }
}
