<?php

use Illuminate\Http\Request;
use Modules\Article\Api\ModelController;
use Modules\Article\Api\TagController;
use Modules\Article\Api\ContentController;
use Modules\Article\Api\CategoryController;

Route::group(['prefix' => 'Article/{site}', 'middleware' => ['module']], function () {
    //模型
    Route::apiResource('model', ModelController::class);
    //标签
    Route::apiResource('tag', TagController::class);
    //文章
    Route::apiResource('content', ContentController::class);
    //栏目
    Route::apiResource('category', CategoryController::class);
});
