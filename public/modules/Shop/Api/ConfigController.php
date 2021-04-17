<?php

namespace Modules\Shop\Api;

use App\Http\Controllers\Controller;
use App\Models\ModuleConfig;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use ModuleService;

class ConfigController extends Controller
{
    public function get()
    {
        return config('module');//null
    }

    public function update(Request $request)
    {
        ModuleService::saveConfig($request->all());
        return $this->message('模块配置更新成功');
    }
}
