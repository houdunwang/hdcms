<?php

namespace Modules\Shop\Database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Shop\Entities\Brand;
use Arr;

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
            'description' => $this->faker->text(100),
            'is_commend' => Arr::random([true, false]),
            'user_id' => 1,
            'sn' => 'S-' . mt_rand(10000, 99999),
            'price' => mt_rand(100, 1000),
            'market_price' => mt_rand(100, 1000),
            'preview' => image_random(),
            'thumb' => image_random(),
            'images' => $this->images(),
            'content' => file_get_contents("https://hdcms-dev.oss-cn-hangzhou.aliyuncs.com/html/" . mt_rand(1, 2) . ".html"),
            'number' => mt_rand(100, 2000)
        ];
    }

    protected function images()
    {
        $images = [];
        for ($i = 0; $i < 4; $i++) {
            array_push($images, "https://hdcms-dev.oss-cn-hangzhou.aliyuncs.com/images/b" . mt_rand(1, 110) . ".jpg");
        }
        return $images;
    }
}
