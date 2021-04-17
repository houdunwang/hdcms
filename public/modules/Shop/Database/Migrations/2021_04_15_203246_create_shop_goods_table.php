<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopGoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_goods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained('shop_categories')->onDelete('cascade');
            $table->foreignId('grand_id')->constrained('shop_grand')->onDelete('cascade');
            $table->string('title')->comment('商品名称');
            $table->string('keywords')->nullable()->comment('关键词');
            $table->string('description')->nullable()->comment('商品简介');
            $table->string('preview')->comment('预览图片');
            $table->text('content')->comment('详细介绍');
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
        Schema::dropIfExists('shop_goods');
    }
}
