<?php

use Illuminate\Http\Request;
use Modules\Shop\Api\CategoryController;
use Modules\Shop\Api\ConfigController;
use Modules\Shop\Api\AttributeTypeController;
use Modules\Shop\Api\AttributeController;
use Modules\Shop\Api\GoodsController;
use Modules\Shop\Api\GoodsAttributeController;
use Modules\Shop\Api\BrandController;
use Modules\Shop\Api\SupplierController;

Route::group(['prefix' => "Shop/site/{site}"], function () {
    Route::apiResource('category', CategoryController::class)->middleware(['auth:sanctum']);
    //模块配置
    Route::get('config', [ConfigController::class, 'get']);
    Route::put('config', [ConfigController::class, 'update']);
    //属性类型
    Route::apiResource('attributeType', AttributeTypeController::class);
    Route::apiResource('type.attribute', AttributeController::class);
    //商品
    Route::apiResource('goods', GoodsController::class);
    Route::get('goods_reset/{goods}', [GoodsController::class, 'reset']);
    //商品属性
    Route::apiResource('goods.attribute', GoodsAttributeController::class);
    //品牌
    Route::apiResource('brand', BrandController::class);
    //供货商
    Route::apiResource('supplier', SupplierController::class);
});
