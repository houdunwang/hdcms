<?php

namespace Modules\Shop\Entities;

use App\Models\ModuleModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * 优惠券
 * @package Modules\Shop\Entities
 */
class Coupon extends ModuleModel
{
    use HasFactory;

    protected $table = 'shop_coupon';

    //满减
    public const TYPE_FIXED_PRICE = 'fixed_price';
    //折扣
    public const TYPE_DISCOUNT = 'discount';

    protected $appends = ['formatTitle', 'valueTitle', 'formatTime'];

    protected $fillable = [
        'site_id', 'title', 'total', 'type', 'value', 'use_num', 'amount', 'begin_time', 'end_time', 'state'
    ];

    protected $dates = ['begin_time', 'end_time'];
    protected $casts = [
        'total' => 'integer'
    ];

    protected static function newFactory()
    {
        return \Modules\Shop\Database\factories\CouponFactory::new();
    }

    public function getFormatTitleAttribute()
    {
        switch ($this->type) {
            case Coupon::TYPE_FIXED_PRICE:
                return str_replace('.00', '', "订单满{$this->amount} 减{$this->value}");
            default:
                return str_replace('.00', '', "满{$this->amount} 打" . ($this->value * 10) . "折");
        }
    }

    public function getValueTitleAttribute()
    {
        switch ($this->type) {
            case Coupon::TYPE_FIXED_PRICE:
                return str_replace('.00', '', $this->value) . "元";
            default:
                return ($this->value * 10) . "折";
        }
    }

    public function getFormatTimeAttribute()
    {
        return $this->begin_time->format('Y-m-d') . ' ~ ' . $this->end_time->format('Y-m-d');
    }
}
