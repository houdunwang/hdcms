<?php

use Illuminate\Http\Request;
use Modules\Shop\Api\CategoryController;

Route::group(['prefix' => "Shop/site/{site}"], function () {
    Route::apiResource('category', CategoryController::class)->middleware(['auth:sanctum']);
});
