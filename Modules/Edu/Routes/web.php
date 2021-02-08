<?php
Route::get('Edu/front/{path?}', function () {
    return view('edu::front');
})->where('path', '.*')->middleware('module');

Route::get('Edu/admin/{path?}', function () {
    return view('edu::admin');
})->where('path', '.*')->middleware('admin');
