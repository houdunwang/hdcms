<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Auth;

/**
 * 用户资源
 * @package App\Http\Resources
 */
class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return  [
            'name' => $this->name ?? '盾友',
            'avatar' => $this->icon,
            'wechat' => $this->when($this->permission['update'], $this->wechat),
            'mobile' => $this->when($this->permission['update'], $this->mobile),
            'email' => $this->when($this->permission['update'], $this->email),
            'roles' => $this->whenLoaded('roles'),
            'group' => new GroupResource($this->whenLoaded('group')),
            'is_following' => Auth::check() && Auth::user()->isFollow($this->resource),
        ] + parent::toArray($request);
    }
}
