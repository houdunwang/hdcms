<?php

namespace Modules\Shop\Database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BrandFactory extends Factory
{
    protected $model = \Modules\Shop\Entities\Brand::class;

    public function definition()
    {
        return [
            'site_id' => 1,
            'user_id' => 1,
            'title' => $this->faker->name(),
            'description' => $this->faker->sentence(),
            'logo' => image_random(),
        ];
    }
}
