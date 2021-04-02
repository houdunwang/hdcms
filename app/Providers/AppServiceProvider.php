<?php

namespace App\Providers;

use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        if ($this->app->isLocal()) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        define('IS_INSTALL', is_file(public_path('install.lock')));
        // 去掉资源的data包装
        JsonResource::withoutWrapping();
        $this->config();
    }

    /**
     * 数据库连接
     * @return void
     * @throws BindingResolutionException
     */
    protected function config()
    {
        //sanctum
        config(['sanctum.stateful' => array_merge(config('sanctum.stateful'), [request()->getHost()])]);
    }
}
