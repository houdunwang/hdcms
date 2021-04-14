<?php

Route::get('Shop/site/{site}/{path}', function () {
    return view("shop::app");
})->where('path', '.*');
