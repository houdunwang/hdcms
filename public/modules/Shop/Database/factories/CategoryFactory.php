<?php

namespace Modules\Shop\Database\factories;

use Arr;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = \Modules\Shop\Entities\Category::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name(),
            'site_id' => 1,
            'preview' => image_random(),
            'is_commend' => Arr::random([true, false])
        ];
    }
}
