<?php

namespace Modules\Edu\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 课程视频
 * @package Modules\Edu\Transformers
 */
class VideoResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'site_id' => $this->site_id,
            'lesson_id' => $this->lesson_id,
            'title' => $this->title,
            'favour_count' => $this->favour_count,
            'read_count' => $this->read_count,
            'rank' => $this->rank,
            'favorite_count' => $this->favorite_count,
            'permissions' => $this->permissions,
            'comment_count' => $this->comment_count,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'external_address' => $this->external_address,
            'path' => $this->when($this->permissions['show'], $this->path),
            'lesson' => new LessonResource($this->whenLoaded('lesson'))
        ];
    }
}
