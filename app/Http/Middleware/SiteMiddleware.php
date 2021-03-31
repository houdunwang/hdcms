<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use App\Models\Site;
use SiteService;
use Closure;
use ModuleService;
use App\Models\Module;
use View;
use Auth;
use Browser;
use WeChatService;
use App\Models\SystemConfig;
use Illuminate\Contracts\Container\BindingResolutionException;

/**
 * 站点中间件
 * @package App\Http\Middleware
 */
class SiteMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $this->site();
        $this->module();
        $this->share();
        return $next($request);
    }

    /**
     * 共享数据
     * @return void
     */
    protected function share()
    {
        View::share('hd', [
            'site' => site(),
            'permissions' => Auth()->user()->getAllPermissions()->pluck('name'),
            'module' => module(),
            'systemConfig' => SystemConfig::find(1),
            'device' => ['mobile' => Browser::isMobile(), 'desktop' => Browser::isDesktop(), 'wechat' => WeChatService::isWeChat()],
            'user' => Auth::user(),
            'version' => $this->version()
        ]);
    }

    /**
     * 版本
     * @return void
     * @throws BindingResolutionException
     */
    protected function version()
    {
        $version = config('app.version');
        if (module()) {
            $version .= module('version');
        }
        return $version;
    }

    /**
     * 站点
     * @return Site
     * @throws BindingResolutionException
     * @throws SuspiciousOperationException
     * @throws ConflictingHeadersException
     * @throws HttpException
     * @throws NotFoundHttpException
     */
    protected function site()
    {
        $site = request('site');
        $site = is_numeric($site) ? Site::findOrFail($site) : $site;
        $site = $site instanceof Site ? $site : SiteService::getByDomain();
        if ($site instanceof Site) {
            SiteService::cache($site);
        }
    }

    /**
     * 模块
     * @return Module
     * @throws BindingResolutionException
     * @throws HttpException
     * @throws NotFoundHttpException
     */
    protected function module()
    {
        if (site()) {
            $module = request('module');
            $module = is_numeric($module) ? Module::findOrFail($module) : $module;
            $module = $module instanceof Module ? $module : ModuleService::getByDomain();
            if ($module instanceof Module) {
                ModuleService::cache($module);
            }
        }
    }
}
