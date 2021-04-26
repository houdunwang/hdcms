<?php

namespace Modules\Shop\Database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * 属性类型
 * @package Modules\Shop\Database\factories
 */
class AttributeTypeFactory extends Factory
{
    protected $model = \Modules\Shop\Entities\AttributeType::class;

    public function definition()
    {
        return [
            'site_id' => 1,
            'user_id' => 1,
            'title' => $this->faker->name()
        ];
    }
}
