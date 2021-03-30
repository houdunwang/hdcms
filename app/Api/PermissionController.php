<?php

namespace App\Api;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use App\Models\Site;
use PermissionService;

/**
 * 权限设置
 * @package App\Http\Controllers\Site
 */
class PermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'site']);
    }

    /**
     * 站点权限规则
     * @param Site $site
     * @return void
     */
    public function sitePermissionRules(Site $site)
    {
        return PermissionService::siteAllPermissions($site);
    }

    /**
     * 保存权限
     * @param Request $request
     * @param Role $role
     * @return void
     */
    public function update(Request $request, Site $site, Role $role)
    {
        $this->authorize('update', $site);
        $role->syncPermissions($request->input('permissions'));
        return $this->message('权限设置成功');
    }

    /**
     * 更新站点权限信息
     * @param Request $request
     * @param Site $site
     * @return void
     */
    public function sync(Request $request, Site $site)
    {
        $this->authorize('update', $site);
        //同步模块权限到站点
        PermissionService::syncSitePermissions($site);
        return $this->message('站点权限表更新成功');
    }
}
