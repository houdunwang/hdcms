<?php

namespace Modules\Shop\Database\factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * 收货地址
 * @package Modules\Shop\Database\factories
 */
class AddressFactory extends Factory
{
    protected $model = \Modules\Shop\Entities\Address::class;

    public function definition()
    {
        return [
            'site_id' => 1,
            'user_id' => 1,
            'district' => '北京 北京 朝阳',
            'tel' => '199188199921',
            'info' => '朝阳区小营路19999号',
            'consignee' => '向军'
        ];
    }
}
