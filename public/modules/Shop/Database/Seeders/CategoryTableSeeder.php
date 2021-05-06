<?php

namespace Modules\Shop\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Shop\Entities\Category;
use Modules\Shop\Entities\Goods;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        Category::factory()->count(20)->create()->each(function ($category) {
            Category::factory()->count(10)->hasGoods(10)->create([
                'pid' => $category['id'],
                'path' => "0-{$category['id']}"
            ]);
        });
    }
}
