<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

//课程视频
class CreateEduVideosTable extends Migration
{
    public function up()
    {
        Schema::create('edu_videos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('lesson_id')->constrained('edu_lessons')->onDelete('cascade');
            $table->string('title')->comment('视频标题');
            $table->text('path')->nullable()->comment('视频文件');
            $table->text('external_address')->nullable()->comment('外部播放地址');
            $table->unsignedSmallInteger('rank')->default(0)->comment('排序');
            $table->unsignedBigInteger('read_count')->default(0)->comment('查看次数');
            $table->unsignedBigInteger('favour_count')->default(0)->comment('点赞数');
            $table->unsignedBigInteger('favorite_count')->default(0)->comment('收藏数');
            $table->unsignedBigInteger('comment_count')->default(0)->comment('评论数');
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
        Schema::dropIfExists('edu_videos');
    }
}
