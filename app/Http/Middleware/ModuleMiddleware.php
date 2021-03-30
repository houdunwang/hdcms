<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use App\Models\Site;
use SiteService;
use Closure;
use ModuleService;
use App\Models\Module;

/**
 * 模块中间件
 * @package App\Http\Middleware
 */
class ModuleMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $this->site();
        $this->module();
        //共享数据
        view()->share('site', site());
        view()->share('module', module());
        return $next($request);
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
            if (!$module) {
                $module = ModuleService::getByDomain() ?? site()->module;
            }
            //站点模块检测
            if (ModuleService::siteHasModule(site(), $module)) {
                ModuleService::cache($module);
            }
        }
    }
}
