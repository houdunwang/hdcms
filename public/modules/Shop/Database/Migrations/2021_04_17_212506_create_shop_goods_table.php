<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopGoodsTable extends Migration
{
    public function up()
    {
        Schema::create('shop_goods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained('shop_categories')->onDelete('cascade');
            $table->foreignId('attribute_type_id')->nullable()->constrained('shop_attribute_type')->onDelete('set null');
            $table->foreignId('grand_id')->constrained('shop_grand')->onDelete('cascade');
            $table->string('title')->comment('商品名称');
            $table->boolean('state')->default(true)->comment('是否上架');
            $table->decimal('price')->nullable()->comment('价格');
            $table->string('description')->nullable()->comment('商品简介');
            $table->string('preview')->comment('预览图片');
            $table->string('thumb')->comment('栏目列表的缩略图');
            $table->string('thumb')->comment('栏目列表的缩略图');
            $table->json('images')->nullable()->comment('内容页展示的图集');
            $table->text('content')->comment('详细介绍');
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
        Schema::dropIfExists('shop_goods');
    }
}
