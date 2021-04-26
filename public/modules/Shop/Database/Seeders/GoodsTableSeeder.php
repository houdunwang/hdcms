<?php

namespace Modules\Shop\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Shop\Entities\Goods;

/**
 * 商品
 * @package Modules\Shop\Database\Seeders
 */
class GoodsTableSeeder extends Seeder
{
    public function run()
    {
        Model::unguard();
        Goods::factory()->count(20)->create();
    }
}
