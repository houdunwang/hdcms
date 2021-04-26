<?php

namespace Modules\Shop\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Shop\Entities\Supplier;

/**
 * 供货商
 * @package Modules\Shop\Database\Seeders
 */
class SupplierTableSeeder extends Seeder
{
    public function run()
    {
        Model::unguard();
        Supplier::factory()->count(3)->create();
    }
}
