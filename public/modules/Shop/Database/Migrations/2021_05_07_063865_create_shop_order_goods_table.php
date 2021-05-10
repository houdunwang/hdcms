<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopOrderGoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_order_goods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('shop_order')->onDelete('cascade');
            $table->foreignId('goods_id')->constrained('shop_goods')->onDelete('cascade');
            $table->foreignId('product_id')->nullable()->constrained('shop_product')->onDelete('set null');
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
        Schema::dropIfExists('shop_order_goods');
    }
}
