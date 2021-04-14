<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 幻灯片
 * @package
 */
class CreateArticleSwipersTable extends Migration
{
    public function up()
    {
        Schema::create('article_swipers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('幻灯片描述');
            $table->char('name', 20)->index()->comment('标识用于前台调用');
            $table->json('items')->comment('幻灯片图片,文章');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('article_swipers');
    }
}
