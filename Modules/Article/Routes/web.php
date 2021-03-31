<?php

use Modules\Article\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'Article', 'as' => 'article.'], function () {
    Route::get('/', [HomeController::class, 'home'])->middleware(['module']);
    Route::get('category/{category}.html', [HomeController::class, 'category'])->name('category');
    Route::get('content/{content}.html', [HomeController::class, 'content'])->name('content');
});
