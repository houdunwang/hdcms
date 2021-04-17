<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopGoodsAttributeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_goods_attribute', function (Blueprint $table) {
            $table->id();
            $table->foreignId('goods_id')->constrained('shop_goods')->onDelete('cascade');
            $table->foreignId('attribute_id')->constrained('shop_attribute')->onDelete('cascade');
            $table->string('attribute_value')->comment('属性值');
            $table->decimal('price')->comment('加价');
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
        Schema::dropIfExists('shop_goods_attribute');
    }
}
