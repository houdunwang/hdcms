<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Http\Request;
use ModuleService;

/**
 * 模块前台主页入口
 * @package App\Http\Controllers
 */
class HomeController extends Controller
{
    /**
     * 模块前台首页
     * @param Request $request
     * @return mixed
     * @throws BindingResolutionException
     */
    public function index(Request $request)
    {
        dd(module());
        if (module()) {
            dd(site()->toArray());
            $class = 'Modules\\' . site()->module['name'] . '\Http\Controllers\Front\HomeController';
            return app($class)->index($request);
        }
    }
}
