<?php

namespace Modules\Shop\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 货品
 * @package Modules\Shop\Transformers
 */
class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
