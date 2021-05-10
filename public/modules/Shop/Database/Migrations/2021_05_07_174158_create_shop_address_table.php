<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 收货地址
 * @package
 */
class CreateShopAddressTable extends Migration
{
    public function up()
    {
        Schema::create('shop_address', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('consignee')->comment('收货人');
            $table->string('district')->comment('地区');
            $table->string('info')->comment('详细地址');
            $table->string('tel')->comment('联系电话');
            $table->boolean('is_default')->default(false)->comment('默认地址');
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
        Schema::dropIfExists('shop_address');
    }
}
