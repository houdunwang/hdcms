<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 属性
 * @package
 */
class CreateShopAttributeTable extends Migration
{
    public function up()
    {
        Schema::create('shop_attribute', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attribute_type_id')->constrained('shop_attribute_type')->onDelete('cascade');
            $table->string('title')->comment('属性');
            $table->unsignedTinyInteger('type')->comment('属性类型 1:普通属性 2:规格');
            $table->string('form_type')->comment('表单类型 input:文本 select:列表项 textarea:文本域 color:颜色选择器 image:图片选择');
            $table->json('content')->nullable()->comment('属性默认值,如列表项选项值');
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
        Schema::dropIfExists('shop_attribute');
    }
}
