<?php

namespace Modules\Shop\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Shop\Entities\Category;

/**
 * 栏目
 * @package Modules\Shop\Database\Seeders
 */
class CategoryTableSeeder extends Seeder
{
    public function run()
    {
        Model::unguard();
        Category::factory()->count(10)->create();
    }
}
