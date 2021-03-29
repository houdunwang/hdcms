<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * 微信素材
 * @package
 */
class CreateWeChatMaterialsTable extends Migration
{
    public function up()
    {
        Schema::create('we_chat_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('wechat_id')->constrained('we_chats')->onDelete('cascade');
            $table->foreignId('module_id')->nullable()->constrained()->onDelete('cascade')->commit('模块');
            $table->char('type', 20)->comment('素材类型');
            $table->string('title')->comment('素材描述');
            $table->string('file')->nullable()->comment('本地文件');
            $table->enum('duration', ['short', 'long'])->nullable()->comment('保存时间 short临时long永久');
            $table->json('content')->nullable()->comment('内容数据');
            $table->json('response')->comment('微信返回数据');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('we_chat_materials');
    }
}
