<?php

use Illuminate\Http\Request;
use Modules\Shop\Api\AddressController;
use Modules\Shop\Api\CategoryController;
use Modules\Shop\Api\ConfigController;
use Modules\Shop\Api\AttributeTypeController;
use Modules\Shop\Api\AttributeController;
use Modules\Shop\Api\GoodsController;
use Modules\Shop\Api\GoodsAttributeController;
use Modules\Shop\Api\BrandController;
use Modules\Shop\Api\CouponController;
use Modules\Shop\Api\OrderController;
use Modules\Shop\Api\SupplierController;
use Modules\Shop\Api\ProductController;
use Modules\Shop\Api\SearchController;
use Modules\Shop\Api\UserCouponController;

Route::group(['prefix' => "Shop/site/{site}"], function () {
    Route::get('category/goods_list', [CategoryController::class, 'goodsList']);
    Route::get('category/all_chilren', [CategoryController::class, 'all_chilren']);
    Route::apiResource('category', CategoryController::class);
    //模块配置
    Route::get('config', [ConfigController::class, 'get']);
    Route::put('config', [ConfigController::class, 'update']);
    //属性类型
    Route::apiResource('attributeType', AttributeTypeController::class);
    Route::apiResource('type.attribute', AttributeController::class);
    //商品
    Route::get('goods/commend', [GoodsController::class, 'commend']);
    Route::apiResource('goods', GoodsController::class);
    Route::get('goods_reset/{goods}', [GoodsController::class, 'reset']);
    //商品属性
    Route::apiResource('goods.attribute', GoodsAttributeController::class);
    //品牌
    Route::apiResource('brand', BrandController::class);
    //供货商
    Route::apiResource('supplier', SupplierController::class);
    //货品
    Route::post("goods/{goods}/product", [ProductController::class, 'store']);
    Route::get("goods/{goods}/product/attributes", [ProductController::class, 'attributes']);
    Route::get("goods/{goods}/product", [ProductController::class, 'show']);
    //优惠券
    Route::apiResource('coupon', CouponController::class);
    //用户优惠券
    Route::apiResource('user/coupon', UserCouponController::class);
    //定单
    Route::apiResource('order', OrderController::class);
    //地址
    Route::apiResource('address', AddressController::class);
    //搜索
    Route::get('search/goods', [SearchController::class, 'goods']);
});
