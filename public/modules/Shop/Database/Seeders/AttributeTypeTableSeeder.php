<?php

namespace Modules\Shop\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Shop\Entities\AttributeType;

/**
 * 属性类型
 * @package Modules\Shop\Database\Seeders
 */
class AttributeTypeTableSeeder extends Seeder
{
    public function run()
    {
        Model::unguard();

        AttributeType::factory()->count(2)->create();
    }
}
