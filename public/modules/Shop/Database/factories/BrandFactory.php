<?php

namespace Modules\Shop\Database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * 品牌
 * @package Modules\Shop\Database\factories
 */
class BrandFactory extends Factory
{
    protected $model = \Modules\Shop\Entities\Brand::class;

    public function definition()
    {
        return [
            'site_id' => 1,
            'user_id' => 1,
            'title' => $this->faker->name(),
            'logo' => image_random(),
            'description' => $this->faker->sentence(),
        ];
    }
}
