<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * 商品
 * @package
 */
class CreateShopGoodsTable extends Migration
{
    public function up()
    {
        Schema::create('shop_goods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained('shop_categories')->onDelete('cascade');
            $table->foreignId('attribute_type_id')->nullable()->constrained('shop_attribute_type')->onDelete('set null');
            $table->foreignId('supplier_id')->nullable()->constrained('shop_supplier')->onDelete('cascade');
            $table->foreignId('grand_id')->nullable()->constrained('shop_grand')->onDelete('cascade');
            $table->string('title')->comment('商品名称');
            $table->boolean('is_commend')->nullable()->comment('推荐商品');
            $table->string('sn')->nullable()->comment('商品货号');
            $table->boolean('state')->default(true)->comment('是否上架');
            $table->decimal('price')->nullable()->comment('价格');
            $table->decimal('market_price')->nullable()->comment('市场价');
            $table->string('preview')->nullable()->comment('预览图片');
            $table->string('thumb')->nullable()->comment('栏目列表的缩略图');
            $table->json('images')->nullable()->comment('内容页展示的图集');
            $table->text('content')->nullable()->comment('详细介绍');
            $table->unsignedInteger('number')->nullable()->comment('库存数量');
            $table->string('keywords')->nullable()->comment('商品关键词');
            $table->string('description')->nullable()->comment('商品简短描述');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_goods');
    }
}
