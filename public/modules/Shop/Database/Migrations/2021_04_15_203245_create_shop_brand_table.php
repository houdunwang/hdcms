<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 品牌
 * @package
 */
class CreateShopBrandTable extends Migration
{
    public function up()
    {
        Schema::create('shop_brand', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('品牌名称');
            $table->string('logo')->comment('品牌标志');
            $table->string('description')->comment('品牌介绍');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_brand');
    }
}
