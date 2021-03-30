<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use ModuleService;
use Spatie\Permission\Models\Permission;

/**
 * 系统模块
 * @package App\Models
 */
class Module extends Model
{
    protected $fillable = ['title', 'name', 'description', 'author'];

    protected $appends = ['config', 'preview', 'version'];

    /**
     * 模块版本
     * @return mixed
     */
    public function getVersionAttribute()
    {
        return $this->config['version'];
    }

    /**
     * 模块菜单
     * @return void
     */
    public function getMenusAttribute()
    {
        return ModuleService::config($this->name, 'menus');
    }

    /**
     * 模块初始配置
     * @return void
     */
    public function getConfigAttribute()
    {
        return ModuleService::config($this->name, 'config');
    }

    /**
     * 预览图
     * @return void
     */
    public function getPreviewAttribute()
    {
        return url("modules/{$this->name}/static/preview.jpeg");
    }

    public function getGroupsAttribute()
    {
        return $this->packages()->with('groups')->get()->mapWithKeys(fn ($p) => $p['groups'])->unique('id');
    }

    public function packages()
    {
        return $this->belongsToMany(Package::class);
    }

    /**
     * 模块的权限表
     * 不含系统权限
     * @return HasMany
     */
    public function permissions()
    {
        return $this->hasMany(Permission::class, 'module_id');
    }
}
