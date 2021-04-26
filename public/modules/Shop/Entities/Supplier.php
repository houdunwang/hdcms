<?php

namespace Modules\Shop\Entities;

use App\Models\ModuleModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * 供货商
 * @package Modules\Shop\Entities
 */
class Supplier extends ModuleModel
{
    use HasFactory;

    protected $table = 'shop_supplier';

    protected $fillable = ['site_id', 'user_id', 'title', 'description'];

    protected static function newFactory()
    {
        return \Modules\Shop\Database\factories\SupplierFactory::new();
    }
}
