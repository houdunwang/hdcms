<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopCategoriesTable extends Migration
{
    /**
     * 栏目
     * @return void
     */
    public function up()
    {
        Schema::create('shop_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('分类名称');
            $table->unsignedBigInteger('pid')->default(0)->commit('父级栏目');
            $table->string('path')->default(0)->comment('栏目多级路径');
            $table->string('unit')->default('件')->comment('商品单位');
            $table->boolean('is_commend')->default(false)->comment('推荐栏目');
            $table->unsignedBigInteger('goods_total')->nullable()->comment('商品数量');
            $table->boolean('is_show')->default(true)->comment('栏目是否显示');
            $table->string('preview')->nullable()->comment('缩略图');
            $table->string('keywords')->nullable()->comment('关键词');
            $table->string('description', 200)->nullable()->comment('栏目描述');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_categories');
    }
}
