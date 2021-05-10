<?php

namespace Modules\Shop\Entities;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * 订单
 * @package Modules\Shop\Entities
 */
class Order extends Model
{
    use HasFactory;

    protected $table = 'shop_order';

    protected $fillable = ['site_id', 'sn', 'user_id', 'coupon_id', 'price', 'pay_type', 'pay_sn', 'state'];

    protected static function newFactory()
    {
        // return \Modules\Shop\Database\factories\OrderFactory::new();
    }

    /**
     * 订单号
     * @return string
     */
    public static function sn()
    {
        return 'RS' . site('id') . 'M' . module('id') . '-' . date('Ymdhis');
    }

    /**
     * 订单商品关联
     * @return HasMany
     */
    public function goods()
    {
        return $this->hasMany(OrderGoods::class);
    }

    /**
     * 用户关联
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
