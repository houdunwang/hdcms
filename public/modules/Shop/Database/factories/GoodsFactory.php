<?php

namespace Modules\Shop\Database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Shop\Entities\Brand;

/**
 * 商品
 * @package Modules\Shop\Database\factories
 */
class GoodsFactory extends Factory
{
    protected $model = \Modules\Shop\Entities\Goods::class;

    public function definition()
    {
        return [
            'site_id' => 1,
            'brand_id' => Brand::pluck('id')->random(),
            'title' => $this->faker->name(),
            'user_id' => 1,
            'sn' => 'S-' . mt_rand(10000, 99999),
            'price' => mt_rand(100, 1000),
            'market_price' => mt_rand(100, 1000),
            'preview' => image_random(),
            'thumb' => image_random(),
            'content' => $this->faker->paragraph(),
            'number' => mt_rand(100, 2000)
        ];
    }
}
