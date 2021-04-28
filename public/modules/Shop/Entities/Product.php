<?php

namespace Modules\Shop\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * 货品
 * @package Modules\Shop\Entities
 */
class Product extends Model
{
    use HasFactory;

    protected $table = 'shop_product';

    protected $fillable = ['site_id', 'goods_id', 'attributes', 'sn', 'number', 'user_id'];

    protected $appends = ['attributeList'];

    protected static function newFactory()
    {
        // return \Modules\Shop\Database\factories\ProductFactory::new();
    }

    /**
     * 转数性为数组
     * @return string[]|false
     */
    public function getAttributeListAttribute()
    {
        return collect(explode('-', $this['attributes']))->map(fn ($a) => intval($a));
    }
}
