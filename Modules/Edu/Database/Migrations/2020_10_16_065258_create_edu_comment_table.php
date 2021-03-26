<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 评论
 * @package
 */
class CreateEduCommentTable extends Migration
{
    public function up()
    {
        Schema::create('edu_comment', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('reply_id')->nullable()->comment('回复的评论');
            $table->unsignedBigInteger('reply_comment_id')->nullable()->comment('回复的回复');
            $table->text('content');
            $table->unsignedMediumInteger('favour_count')->nullable()->comment('点赞统计');
            $table->morphs('comment');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('edu_comment');
    }
}
