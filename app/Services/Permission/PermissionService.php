<?php

namespace App\Services\Permission;

use App\Models\Site;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Collection;
use App\Models\Module;
use App\Models\User;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\InvalidCastException;
use LogicException;
use ModuleService;
use UserService;

/**
 * 权限管理服务
 * @package App\Services
 */
class PermissionService
{
    /**
     * 权限验证
     * @param Site $site
     * @param Module $module
     * @param User $user
     * @param string $permission
     * @return bool
     * @throws InvalidCastException
     * @throws LogicException
     * @throws BindingResolutionException
     */
    public function access(Site $site,  User $user, string $permission): bool
    {
        if (UserService::isSuperAdmin($user) || UserService::isMaster($user, $site)) {
            return true;
        }
        return $user->can($this->permissionName($site, $permission));
    }



    /**
     * 用户是否可使用站点的模块
     * @param Site $site
     * @param Module $module
     * @param User $user
     * @return bool
     * @throws InvalidCastException
     * @throws LogicException
     */
    public function checkModuleAccess(Site $site, Module $module, User $user): bool
    {
        return (bool)$module->permissions->filter(function ($permission) use ($site, $module, $user) {
            return $this->access($site, $user, $permission);
        })->count();
    }

    /**
     * 提取模块、系统权限规则
     * @param Site $site
     * @return Collection
     */
    public function permissionRules(Site $site): Collection
    {
        return $this->siteAllPermissions($site)->reduce(function ($collect, $module) {
            foreach ($module['permissions'] as $permission) {
                $collect->push(...$permission['rules']);
            }
            return $collect;
        }, collect());
    }

    /**
     * 同步站点权限到权限表
     * @param Site $site
     * @return void
     */
    public function syncSitePermissions(Site $site)
    {
        $permissionCollection = $this->permissionRules($site);
        //删除无效的站点权限
        $names = $permissionCollection->map(fn ($p) => $p['permission_name']);
        Permission::where('site_id', $site['id'])->whereNotIn('name', $names)->delete();
        //同步权限
        $permissionCollection->each(function ($permission) use ($site) {
            Permission::updateOrCreate(
                ['name' => $permission['permission_name']],
                ['site_id' => $site->id,  'name' => $permission['permission_name']] + $permission

            );
        });
    }

    /**
     * 站点权限表包含系统权限
     * @param Site $site
     * @return Collection
     * @throws BindingResolutionException
     * @throws InvalidCastException
     * @throws LogicException
     */
    public function siteAllPermissions(Site $site): collection
    {
        //棋块权限
        $permissions = $site->modules->map(function ($module) use ($site) {
            $permissions = ModuleService::config($module->name, 'permissions');
            foreach ($permissions as &$permission) {
                foreach ($permission['rules'] as &$rule) {
                    $rule['name'] = $module['name'] . '-' . $rule['name'];
                    $rule['permission_name'] = $this->permissionName($site, $rule['name']);
                    $rule['module_id'] = $module['id'];
                }
            }
            return ['title' => $module['title'],  'permissions' => $permissions];;
        });

        //系统权限
        $systemPermissions = config('permissions');
        foreach ($systemPermissions as &$permission) {
            foreach ($permission['rules'] as &$rule) {
                $rule['permission_name'] = $this->permissionName($site,  'hd-' . $rule['name']);
                $rule['name']  = "hd-{$rule['name']}";
            }
        }
        $permissions->push(['title' => '系统功能', 'permissions' => $systemPermissions]);
        return $permissions;
    }

    /**
     * 权限标识
     * @param Site $site
     * @param string $name
     * @return string
     */
    public function permissionName(Site $site, string $name): string
    {
        return "s{$site->id}-{$name}";
    }
}
