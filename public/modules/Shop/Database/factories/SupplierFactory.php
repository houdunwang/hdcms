<?php

namespace Modules\Shop\Database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * 供货商
 * @package Modules\Shop\Database\factories
 */
class SupplierFactory extends Factory
{
    protected $model = \Modules\Shop\Entities\Supplier::class;

    public function definition()
    {
        return [
            'site_id' => 1,
            'user_id' => 1,
            'title' => $this->faker->name(),
            'description' => $this->faker->sentence(),
        ];
    }
}
