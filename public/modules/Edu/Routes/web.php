<?php

use Modules\Edu\Http\Controllers\OrderController;

Route::group(['prefix/site/{site}' => 'Edu', 'as' => 'article.'], function () {
    //套餐定单支付
    Route::get('Order/subscribe/{subscribe}', [OrderController::class, 'subscribe'])->middleware(['auth:sanctum']);
});

Route::get('Edu/site/{site}/{path}', function () {
    return view("edu::app");
})->where('path', '.*');
