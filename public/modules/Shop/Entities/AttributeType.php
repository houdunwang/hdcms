<?php

namespace Modules\Shop\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * 模型类型
 * @package Modules\Shop\Entities
 */
class AttributeType extends Model
{
    use HasFactory;

    protected $fillable = ['site_id', 'title'];

    protected static function newFactory()
    {
        // return \Modules\Shop\Database\factories\AttributeTypeFactory::new();
    }
}
