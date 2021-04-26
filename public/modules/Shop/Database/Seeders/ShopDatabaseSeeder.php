<?php

namespace Modules\Shop\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class ShopDatabaseSeeder extends Seeder
{
    public function run()
    {
        Model::unguard();
        $this->call(CategoryTableSeeder::class);
        $this->call(BrandTableSeeder::class);
        $this->call(SupplierTableSeeder::class);
        $this->call(GoodsTableSeeder::class);
        $this->call(AttributeTypeTableSeeder::class);
    }
}
