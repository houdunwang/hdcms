<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 优惠券
 * @package
 */
class CreateShopCouponTable extends Migration
{
    public function up()
    {
        Schema::create('shop_coupon', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('优惠券描述');
            $table->unsignedInteger('total')->comment('优惠券总数量');
            $table->string('type')->comment('优惠券类型：满减或折扣');
            $table->decimal('value')->comment('满减金额或折扣比例');
            $table->unsignedInteger('use_num')->default(0)->comment('使用数量');
            $table->decimal('amount')->comment('可使用优惠券的订单金额');
            $table->timestamp('begin_time')->comment('有效开始时间');
            $table->timestamp('end_time')->comment('有效结束时间');
            $table->boolean('state')->default(true)->comment('是否启用');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_coupon');
    }
}
