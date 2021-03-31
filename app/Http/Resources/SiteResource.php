<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 站点资源
 * @package App\Http\Resources
 */
class SiteResource extends JsonResource
{
    public function toArray($request)
    {
        return parent::toArray($request) + [
            'config' => $this->when($this->isMaster, $this->config),
            'master' => new UserResource($this->whenLoaded('master')),
        ];
    }
}
