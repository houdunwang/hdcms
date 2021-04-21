<?php

namespace Modules\Shop\Entities;

use App\Models\ModuleModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * 类型的属性
 * @package Modules\Shop\Entities
 */
class Attribute extends ModuleModel
{
    use HasFactory;

    protected $table = 'shop_attribute';

    protected $fillable = ['title', 'attribute_type_id', 'type', 'form_type', 'options'];

    protected static function newFactory()
    {
        // return \Modules\Shop\Database\factories\AttributeFactory::new();
    }

    /**
     * 属性类型
     * @return BelongsTo
     */
    public function attributeType()
    {
        return $this->belongsTo(AttributeType::class);
    }
}
