<?php

namespace Modules\Shop\Entities;

use App\Models\ModuleModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * 模型类型
 * @package Modules\Shop\Entities
 */
class AttributeType extends ModuleModel
{
    use HasFactory;

    protected $table = 'shop_attribute_type';

    protected $fillable = ['site_id', 'title'];

    protected static function newFactory()
    {
        return \Modules\Shop\Database\factories\AttributeTypeFactory::new();
    }

    /**
     * 属性值
     * @return HasMany
     */
    public function attributes()
    {
        return $this->hasMany(Attribute::class, 'attribute_type_id');
    }
}
