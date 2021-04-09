<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 内容
 * @package
 */
class CreateArticleContentsTable extends Migration
{
    public function up()
    {
        Schema::create('article_contents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('model_id')->constrained('article_models')->onDelete('cascade');
            $table->foreignId('wechat_id')->nullable()->constrained('we_chats')->onDelete('set null');
            $table->foreignId('category_id')->constrained('article_categories')->onDelete('cascade');
            $table->string('keyword', 20)->index()->nullable()->comment('微信回复关键词');
            $table->string('title', 100)->nullable()->comment('标题');
            $table->string('url')->nullable()->comment('跳转链接@');
            $table->json('images')->nullable()->comment('图集');
            $table->text('content')->nullable()->comment('内容');
            $table->string('source', 30)->nullable()->comment('来源');
            $table->unsignedInteger('click')->nullable()->comment('点击数');
            $table->string('preview')->nullable()->comment('缩略图');
            $table->string('description')->nullable()->comment('文章介绍');
            $table->json('fields')->nullable()->comment('扩展字段');
            $table->string('template')->nullable()->comment('模板');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('article_contents');
    }
}
