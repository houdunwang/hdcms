<?php

namespace Modules\Shop\Database\factories;

use Arr;
use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Shop\Entities\Coupon;

/**
 * 优惠券
 * @package Modules\Shop\Database\factories
 */
class CouponFactory extends Factory
{

    protected $model = \Modules\Shop\Entities\Coupon::class;

    public function definition()
    {
        $type = Arr::random([Coupon::TYPE_FIXED_PRICE, Coupon::TYPE_DISCOUNT]);
        $value = $type == Coupon::TYPE_FIXED_PRICE ? mt_rand(10, 200) : mt_rand(5, 8) * 0.1;
        $amount = mt_rand(500, 2000);
        return [
            'site_id' => 1,
            'title' => $this->title($type, $value, $amount),
            'total' => 10,
            'type' => $type,
            'value' => $value,
            'amount' => $amount,
            'begin_time' => now()->subDays(mt_rand(1, 850)),
            'end_time' => now()->addMonths(mt_rand(1, 8))
        ];
    }

    protected function title($type, $value, $amount)
    {
        switch ($type) {
            case Coupon::TYPE_FIXED_PRICE:
                return "订单满{$amount} 减{$value}";
                break;
            default:
                return "满{$amount} 打" . ($value * 10) . "折";
        }
    }
}
