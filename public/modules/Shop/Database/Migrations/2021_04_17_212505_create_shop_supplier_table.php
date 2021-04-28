<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 供货商
 * @package
 */
class CreateShopSupplierTable extends Migration
{
    public function up()
    {
        Schema::create('shop_supplier', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title')->comment('供货商');
            $table->string('description')->comment('供货简介');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_supplier');
    }
}
