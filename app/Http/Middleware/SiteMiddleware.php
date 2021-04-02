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
use Illuminate\Support\Facades\Route;

/**
 * 站点中间件
 * @package App\Http\Middleware
 */
class SiteMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!IS_INSTALL && Route::currentRouteName() == 'install.migration') {
            return $next($request);
        }
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
        //主页
        if (Route::currentRouteName() == 'home') {
            SiteService::cache(SiteService::getByDomain());
        } else {
            $site = request('site');
            $site = is_numeric($site) ? Site::findOrFail($site) : $site;
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
        //主页
        if (Route::currentRouteName() == 'home') {
            ModuleService::cache(site('module'));
        } else {
            $module = ModuleService::getByDomain();
            ModuleService::cache($module);
        }
    }
}
