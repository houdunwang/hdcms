<?php

namespace Modules\Shop\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Goods extends Model
{
    use HasFactory;

    protected $table = 'shop_goods';

    protected $fillable = ['site_id', 'category_id', 'attribute_type_id', 'supplier_id', 'grand_id', 'title', 'is_commend', 'sn', 'state', 'price', 'market_price', 'preview', 'thumb', 'images', 'content', 'number', 'keywords', 'description'];

    protected $casts = [
        'is_commend' => 'boolean',
        'state' => 'boolean',
        'number' => 'integer',
        'images' => 'array'
    ];

    protected static function newFactory()
    {
        // return \Modules\Shop\Database\factories\GoodsFactory::new();
    }

    /**
     * 上架筛选
     * @param mixed $query
     * @param int $state
     * @return mixed
     */
    public function scopeState($query, $state = 0)
    {
        return $query->where('steate', $state);
    }

    /**
     * 商品类型
     * @return BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * 属性类型
     * @return BelongsTo
     */
    public function attributeType()
    {
        return $this->belongsTo(AttributeType::class, 'attribute_type_id');
    }

    /**
     * 生成货号
     * @return string
     */
    public static function sn()
    {
        return 'S' . site('id') . 'M' . module('id') . '-' . date('Ymdhis');
    }
}
