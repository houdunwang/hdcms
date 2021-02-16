<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Edu\Api\ConfigController;
use Modules\Edu\Api\TagController;
use Modules\Edu\Api\LessonController;
use Modules\Edu\Api\SystemController;
use Modules\Edu\Api\SubscribeController;
use Modules\Edu\Api\TopicController;
use Modules\Edu\Api\VideoController;
use Modules\Edu\Api\SignController;
use Modules\Edu\Api\ActivityController;
use Modules\Edu\Api\CommentController;
use Modules\Edu\Api\MemberController;
use Modules\Edu\Api\UserVideoController;

Route::group(['prefix' => 'Edu/admin', 'middleware' => ['auth:sanctum', 'admin']], function () {
    //配置
    Route::get('config', [ConfigController::class, 'show']);
    Route::put('config', [ConfigController::class, 'update']);
    //标签
    Route::get('tag', [TagController::class, 'index']);
    Route::put('tag', [TagController::class, 'update']);
    //课程
    Route::get('lesson/search', [LessonController::class, 'search']);
    Route::apiResource('lesson', LessonController::class);
    //系统课程
    Route::apiResource('system', SystemController::class);
    //套餐
    Route::apiResource('subscribe', SubscribeController::class);
});

Route::group(['prefix' => 'Edu/front', 'middleware' => ['front']], function () {
    //标签
    Route::get('tag', [TagController::class, 'index']);
    //系统课程
    Route::apiResource('system', SystemController::class);
    //课程
    Route::get('lesson/search', [LessonController::class, 'search']);
    Route::apiResource('lesson', LessonController::class);
    //贴子
    Route::get('topic/{topic}/comments', [TopicController::class, 'commentList']);
    Route::post('topic/{topic}/comment', [TopicController::class, 'comment']);
    Route::get('topic/{topic}/recommend', [TopicController::class, 'recommend']);
    Route::get('topic/recommend', [TopicController::class, 'recommendList']);
    Route::apiResource('topic', TopicController::class);
    //视频
    Route::get('video/{video}/comments', [VideoController::class, 'commentList']);
    Route::post('video/{video}/comment', [VideoController::class, 'comment']);
    Route::apiResource('video', VideoController::class);
    //签到
    Route::apiResource('sign', SignController::class);
    //动态
    Route::apiResource('activity', ActivityController::class);
    //评论
    Route::apiResource('comment', CommentController::class);
    //用户视频
    Route::apiResource('user/video', UserVideoController::class);
});

Route::group(['prefix' => 'Edu/member', 'middleware' => ['auth:sanctum', 'front']], function () {
    Route::get("video", [MemberController::class, 'video']);
    Route::get("topic", [MemberController::class, 'topic']);
    Route::get("order", [MemberController::class, 'order']);
    Route::get("duration", [MemberController::class, 'duration']);
});
