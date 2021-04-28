<?php

namespace Modules\Shop\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Shop\Entities\Brand;

/**
 * 品牌
 * @package Modules\Shop\Database\Seeders
 */
class BrandTableSeeder extends Seeder
{
    public function run()
    {
        Model::unguard();

        Brand::factory()->count(3)->create();
    }
}
