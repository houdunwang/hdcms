<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 订单
 * @package
 */
class CreateShopOrderTable extends Migration
{
    public function up()
    {
        Schema::create('shop_order', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('goods_id')->constrained('shop_goods')->onDelete('cascade');
            $table->foreignId('product_id')->nullable()->constrained('shop_product')->onDelete('set null');
            $table->foreignId('coupon_id')->nullable()->constrained('shop_coupon')->onDelete('set null');
            $table->decimal('price')->comment('价格');
            $table->string('pay_type')->comment('支付方式如alipay、wepay');
            $table->string('pay_sn', 100)->index()->comment('支付定单号');
            $table->boolean('status')->default(false)->comment('支付状态');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_order');
    }
}
