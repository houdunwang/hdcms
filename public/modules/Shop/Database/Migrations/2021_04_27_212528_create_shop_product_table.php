<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 货品
 * @package
 */
class CreateShopProductTable extends Migration
{
    public function up()
    {
        Schema::create('shop_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('goods_id')->constrained('shop_goods')->onDelete('cascade');
            $table->string('attributes')->comment('规格属性 1-3');
            $table->string('sn')->comment('货号');
            $table->unsignedInteger('number')->comment('库存');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_product');
    }
}
