<?php

namespace Modules\Shop\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Shop\Entities\Coupon;

/**
 * 优惠券
 * @package Modules\Shop\Database\Seeders
 */
class CouponTableSeeder extends Seeder
{
    public function run()
    {
        Model::unguard();
        Coupon::factory()->count(10)->create();
    }
}
