<?php

namespace Modules\Shop\Entities;

use App\Models\ModuleModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * 收货地址
 * @package Modules\Shop\Entities
 */
class Address extends ModuleModel
{
    use HasFactory;

    protected $table = 'shop_address';

    protected $fillable = ['site_id', 'user_id', 'district', 'tel', 'info', 'is_default'];

    protected $casts = [
        'is_default' => 'boolean',
        'site_id' => 'integer',
        'user_id' => 'integer',
    ];

    protected static function newFactory()
    {
        return \Modules\Shop\Database\factories\AddressFactory::new();
    }
}
