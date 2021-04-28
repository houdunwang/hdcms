<?php

namespace Modules\Shop\Entities;

use App\Models\ModuleModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * 商品
 * @package Modules\Shop\Entities
 */
class Goods extends ModuleModel
{
    use HasFactory;

    protected $table = 'shop_goods';

    protected $fillable = ['site_id', 'category_id', 'attribute_type_id', 'supplier_id', 'grand_id', 'title', 'is_commend', 'sn', 'state', 'price', 'market_price', 'preview', 'thumb', 'images', 'content', 'number', 'keywords', 'description', 'user_id', 'del_at'];

    protected $dates = ['del_at'];

    protected $casts = [
        'is_commend' => 'boolean',
        'state' => 'boolean',
        'number' => 'integer',
        'images' => 'array'
    ];


    protected $appends = ['isProduct'];

    protected static function newFactory()
    {
        return \Modules\Shop\Database\factories\GoodsFactory::new();
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

    public function user()
    {
        return $this->belongsTo(User::class);
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
     * 商品属性
     * @return mixed
     */
    public function attributes()
    {
        return $this->hasMany(GoodsAttribute::class, 'goods_id');
    }

    /**
     * 生成货号
     * @return string
     */
    public static function sn()
    {
        return 'S' . site('id') . 'M' . module('id') . '-' . date('Ymdhis');
    }

    /**
     * 品牌关联
     * @return BelongsTo
     */
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    /**
     * 是否含有货品
     * @return void
     */
    public function getIsProductAttribute()
    {
        return $this->attributes()->get()->some(function ($goodsAttribute) {
            return $goodsAttribute->attribute->type == 2;
        });
    }

    /**
     * 货品
     * @return HasMany
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'goods_id');
    }
}
