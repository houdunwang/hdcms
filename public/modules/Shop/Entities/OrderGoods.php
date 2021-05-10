<?php

namespace Modules\Shop\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * 订单商品
 * @package Modules\Shop\Entities
 */
class OrderGoods extends Model
{
    use HasFactory;

    protected $table = 'shop_order_goods';

    protected $fillable = ['order_id', 'product_id', 'goods_id'];

    protected static function newFactory()
    {
        // return \Modules\Shop\Database\factories\OrderGoodsFactory::new();
    }

    /**
     * 商品关联
     * @return HasOne
     */
    public function goods()
    {
        return $this->belongsTo(Goods::class);
    }
}
