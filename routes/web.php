<?php

use App\Http\Controllers\PayNotifyController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\WeChatLoginController;
use App\Http\Controllers\WeChatBindController;
use App\WeChat\ApiController;

//支付通知
Route::group(['prefix' => 'pay/{module}'], function () {
    Route::any('alipay/return', [PayNotifyController::class, 'alipayReturn'])->name('pay.alipay.return');
    Route::any('alipay/notify', [PayNotifyController::class, 'alipayNotify'])->name('pay.alipay.notify');
});

//微信登录
Route::group(['prefix' => 'wechat'], function () {
    Route::get('login', [WeChatLoginController::class, 'login']);
    Route::get('login/callback', [WeChatLoginController::class, 'loginCallback'])->name('wechat.login.callback');
    //绑定微信
    Route::get('bind', [WeChatBindController::class, 'bind']);
    Route::get('bind/callback', [WeChatBindController::class, 'bindCallback'])->name('wechat.bind.callback');
});

//微信接口
Route::any('wechat/api/{site}/{model}', [ApiController::class, 'handle']);

//退出登录
Route::get('logout', function () {
    Auth::logout();
    return redirect('/');
})->middleware(['auth:sanctum']);

//网站主页
Route::get('/', function () {
    if ($module = site('module')) {
        return app("Modules\\{$module['name']}\Http\Controllers\HomeController")->home();
    }
    abort(404);
})->name('home');

//系统应用
Route::get('{app}/{path?}', function () {
    return view('app');
})->where('app', 'system|admin|member|site|login|register|wechat|forget')->where('path', '.*');

Route::fallback(function () {
    abort(404);
});
