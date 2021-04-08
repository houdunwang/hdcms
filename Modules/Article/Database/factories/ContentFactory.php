<?php

namespace Modules\Article\Database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Article\Entities\Category;

/**
 * 文章内容
 * @package Modules\Article\Database\factories
 */
class ContentFactory extends Factory
{
    protected $model = \Modules\Article\Entities\Content::class;

    public function definition()
    {
        $category = Category::where('site_id', 1)->orderByRaw('rand()')->first();
        return [
            'site_id' => 1,
            'user_id' => 1,
            'model_id' => 1,
            'category_id' => $category->id,
            'title' => $this->faker->sentence(),
            'content' => nl2br($this->faker->paragraphs(50, true)),
            'preview' => "https://hdcms-dev.oss-cn-hangzhou.aliyuncs.com/images/b" . mt_rand(1, 110) . ".jpg",
            'description' => $this->faker->sentences(3, true),
        ];
    }
}
