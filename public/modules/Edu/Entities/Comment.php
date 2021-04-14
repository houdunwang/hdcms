<?php

namespace Modules\Edu\Entities;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Carbon\Exceptions\InvalidFormatException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Auth;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * 评论
 * @package Modules\Edu\Entities
 */
class Comment extends Model
{
    protected $table = 'edu_comment';

    protected $fillable = ['content', 'user_id', 'site_id', 'reply_id', 'reply_comment_id'];
    protected $appends = ['permissions', 'title', 'html'];
    /**
     * 模型权限
     * @return void
     */
    public function getPermissionsAttribute()
    {
        return [
            'view' => Auth::check() && Auth::user()->can('view', $this),
            'update' => Auth::check() && Auth::user()->can('update', $this),
            'delete' => Auth::check() && Auth::user()->can('delete', $this)
        ];
    }

    /**
     * 标题属性用于网站动态等
     * @return string
     */
    public function getTitleAttribute()
    {
        return mb_substr(strip_tags($this->content), 0, 100, 'UTF-8');
    }

    /**
     * 转换markdown内容
     * @return mixed
     */
    public function getHtmlAttribute()
    {
        return markdown($this->content);
    }

    /**
     * 回复列表
     * @return HasMany
     */
    public function comments()
    {
        return $this->hasMany(self::class, 'reply_comment_id')->oldest();
    }

    /**
     * 回复的回复
     * @return HasMany
     */
    public function reply()
    {
        return $this->belongsTo(self::class, 'reply_id');
    }

    /**
     * 发表用户
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 多态关联
     * @return MorphTo
     */
    public function commentable()
    {
        return $this->morphTo('comment');
    }
}
