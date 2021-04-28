<?php

namespace Modules\Shop\Entities;

use App\Models\ModuleModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * 品牌
 * @package Modules\Shop\Entities
 */
class Brand extends ModuleModel
{
    use HasFactory;

    protected $table = 'shop_brand';

    protected $fillable = ['site_id', 'user_id', 'title', 'description', 'logo'];

    protected static function newFactory()
    {
        return \Modules\Shop\Database\factories\BrandFactory::new();
    }
}
