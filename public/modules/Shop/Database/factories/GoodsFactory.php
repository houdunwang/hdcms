<?php

namespace Modules\Shop\Database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use Arr;
use Modules\Shop\Entities\Brand;
use Modules\Shop\Entities\Category;
use Modules\Shop\Entities\Supplier;

/**
 * 商品
 * @package Modules\Shop\Database\factories
 */
class GoodsFactory extends Factory
{
    protected $model = \Modules\Shop\Entities\Goods::class;

    public function definition()
    {
        $categories = Category::pluck('id');
        $suppliers = Supplier::pluck('id');
        $brands = Brand::pluck('id');

        return [
            'site_id' => 1,
            'category_id' => $categories->random(),
            'user_id' => 1,
            'supplier_id' => $suppliers->random(),
            'brand_id' => $brands->random(),
            'title' => $this->faker->sentence(),
            'price' => mt_rand(100, 1000),
            'market_price' => mt_rand(100, 1000),
            'preview' => image_random(),
            'thumb' => image_random(),
            'content' => $this->faker->paragraph(),
            'number' => mt_rand(10, 300),
            'sn' => 'S-' . mt_rand(10000, 99999)
        ];
    }
}
