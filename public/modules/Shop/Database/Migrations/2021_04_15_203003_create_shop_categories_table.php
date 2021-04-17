<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopCategoriesTable extends Migration
{
    public function up()
    {
        Schema::create('shop_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('pid')->default(0)->comment('父级目录');
            $table->string('path')->index()->default(0)->comment('多级目录路径');
            $table->string('title')->comment('分类名称');
            $table->string('unit')->default('件')->comment('单位');
            $table->unsignedInteger('goods_num')->default(0)->comment('商品数量');
            $table->boolean('is_show')->default(true)->comment('是否显示');
            $table->unsignedMediumInteger('rank')->default(0)->comment('排序');
            $table->string('preview')->nullable()->comment('缩略图');
            $table->string('keywords')->nullable()->comment('关键词');
            $table->string('description')->nullable()->comment('栏目描述');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_categories');
    }
}
