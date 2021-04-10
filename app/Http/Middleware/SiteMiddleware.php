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
        if (!IS_INSTALL) {
            if (Route::currentRouteName() == 'install.migration') {
                return $next($request);
            }
            return redirect('/install');
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
            'permissions' => Auth::check() and Auth()->user()->getAllPermissions()->pluck('name'),
            'module' => module(),
            'systemConfig' => SystemConfig::where('id', 1)->value('config'),
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
        //其他情况解析域名获取站点
        $site = $site ?? SiteService::getByDomain();
        SiteService::cache($site);
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
        $module = ModuleService::getByDomain();
        $module = $module ?? site('module');
        ModuleService::cache($module);
    }
}
