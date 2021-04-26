<?php

namespace Modules\Shop\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 商品属性
 * @package Modules\Shop\Entities
 */
class GoodsAttribute extends Model
{
    use HasFactory;
    protected $table = 'shop_goods_attribute';

    protected $fillable = ['goods_id', 'attribute_id', 'attribute_value', 'price'];

    protected static function newFactory()
    {
        // return \Modules\Shop\Database\factories\GoodsAttributeFactory::new();
    }

    /**
     * 属性关联
     * @return BelongsTo
     */
    public function attribute()
    {
        return $this->belongsTo(Attribute::class, 'attribute_id');
    }
}
