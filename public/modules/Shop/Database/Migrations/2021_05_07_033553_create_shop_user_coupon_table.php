<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 用户领取优惠券
 * @package
 */
class CreateShopUserCouponTable extends Migration
{

    public function up()
    {
        Schema::create('shop_user_coupon', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('coupon_id')->constrained('shop_coupon')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_user_coupon');
    }
}
