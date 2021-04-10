<?php

namespace Modules\Article\Database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    protected $model = \Modules\Article\Entities\Category::class;

    public function definition()
    {
        return [
            'site_id' => 1,
            'user_id' => 1,
            'model_id' => 1,
            'title' => $this->faker->name(),
            'pid' => 0,
            'preview' => "https://hdcms-dev.oss-cn-hangzhou.aliyuncs.com/images/b" . mt_rand(1, 110) . ".jpg",
            'description' => $this->faker->sentence(),
            'content' => $this->faker->paragraph(3)
        ];
    }
}
