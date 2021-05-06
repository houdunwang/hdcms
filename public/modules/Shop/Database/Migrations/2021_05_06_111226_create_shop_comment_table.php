<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 评论
 * @package
 */
class CreateShopCommentTable extends Migration
{
    public function up()
    {
        Schema::create('shop_comment', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('goods_id')->constrained('shop_goods')->onDelete('cascade');
            $table->unsignedBigInteger('reply_id')->nullable()->comment('回复的评论');
            $table->json('images')->nullable()->comment('评论图片列表');
            $table->text('content');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_comment');
    }
}
