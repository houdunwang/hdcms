<?php

use Modules\Article\Http\Controllers\HomeController;

Route::group(['prefix' => 'Article', 'middleware' => ['module'], 'as' => 'article.'], function () {
    Route::get('/', [HomeController::class, 'home']);
    Route::get('category/{category}.html', [HomeController::class, 'category'])->name('category');
    Route::get('content/{content}.html', [HomeController::class, 'content'])->name('content');
    Route::get('site/{site}/{path?}', fn () => view('article::app'))->where('path', '.*');
});
