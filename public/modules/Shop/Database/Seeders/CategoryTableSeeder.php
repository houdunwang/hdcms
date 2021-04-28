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
        Category::factory()->count(3)->hasGoods(20)->create();
        // Category::factory()->count(3)->has(Goods::factory()->count(20),'abc')->create();
    }
}
