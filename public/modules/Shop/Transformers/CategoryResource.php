<?php

namespace Modules\Shop\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 栏目资源响应
 * @package Modules\Shop\Transformers
 */
class CategoryResource extends JsonResource
{

    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
