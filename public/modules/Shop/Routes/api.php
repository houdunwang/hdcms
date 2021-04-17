<?php

use Illuminate\Http\Request;
use Modules\Shop\Api\CategoryController;
use Modules\Shop\Api\ConfigController;

// Route::middleware('auth:api')->get('/shop', function (Request $request) {
//     return $request->user();
// });
Route::group(['prefix' => "Shop/site/{site}"], function () {
    Route::apiResource('category', CategoryController::class)->middleware(['auth:sanctum']);
    //模块配置
    Route::get('config', [ConfigController::class, 'get']);
    Route::put('config', [ConfigController::class, 'update']);
});
