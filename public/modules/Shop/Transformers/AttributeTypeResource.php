<?php

namespace Modules\Shop\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 属性类型
 * @package Modules\Shop\Transformers
 */
class AttributeTypeResource extends JsonResource
{
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
