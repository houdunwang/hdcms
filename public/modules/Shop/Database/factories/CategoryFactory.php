<?php

namespace Modules\Shop\Database\factories;

use App\Models\Site;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    protected $model = \Modules\Shop\Entities\Category::class;

    public function definition()
    {
        return [
            'title' => $this->faker->name(),
            'site_id' => Site::first()->id,
            'preview' => image_random(),
            'is_show' => true,
            'keywords' => true,
            'description' => $this->faker->name(),
        ];
    }
}
