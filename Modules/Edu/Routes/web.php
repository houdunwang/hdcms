<?php

use Modules\Edu\Http\Controllers\OrderController;

Route::group(['prefix' => 'Edu', 'middleware' => ['site'], 'as' => 'article.'], function () {
    //套餐定单支付
    Route::get('Order/subscribe/{subscribe}', [OrderController::class, 'subscribe'])->middleware(['auth:sanctum']);
});
