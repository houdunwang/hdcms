<?php

namespace Modules\Edu\Transformers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Edu\Entities\Comment;

/**
 * 评论资源
 * @package Modules\Edu\Transformers
 */
class CommentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'user' => $this->user,
            'comments' => $this->comments()->with('user', 'reply.user')->get(),
        ] + parent::toArray($request);
    }
}
