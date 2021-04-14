<?php

use Modules\Shop\Http\Controllers\HomeController;

Route::group(['prefix' => 'Shop', 'as' => 'shop.'], function () {
    Route::get('/', [HomeController::class, 'home']);
});

Route::get('Shop/site/{site}/{path?}', function () {
    return view("shop::app");
})->where('path', '.*')->where('path', '.*');
