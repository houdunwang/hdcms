<?php

namespace Modules\Shop\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 商品资源
 * @package Modules\Shop\Transformers
 */
class GoodsResource extends JsonResource
{
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
