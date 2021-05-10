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
            $table->foreignId('coupon_id')->nullable()->constrained('shop_coupon')->onDelete('set null');
            $table->string('sn')->comment('订单号');
            $table->decimal('price')->comment('价格');
            $table->string('pay_type')->nullable()->comment('支付方式如alipay、wepay');
            $table->string('pay_sn', 100)->nullable()->index()->comment('支付定单号');
            $table->boolean('state')->default(1)->comment('定单状态:1 未支付 2 已经支付 3 发货中 4 完成');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_order');
    }
}
