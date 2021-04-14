<?php

use Modules\Edu\Http\Controllers\HomeController;
use Modules\Edu\Http\Controllers\OrderController;

Route::group(['prefix' => 'Edu', 'as' => 'article.'], function () {
    Route::get('/', [HomeController::class, 'home']);
    //套餐定单支付
    Route::get('Order/subscribe/{subscribe}', [OrderController::class, 'subscribe'])->middleware(['auth:sanctum']);
});

Route::get('Edu/site/{site}/{path?}', function () {
    return view("edu::app");
})->where('path', '.*')->where('path', '.*');
