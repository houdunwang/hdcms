<?php

namespace Modules\Article\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Auth;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\User;
use App\Models\WeChatMessage;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Modules\Article\Database\factories\ContentFactory;

/**
 * 文章
 * @package Modules\Article\Entities
 */
class Content extends Model
{
    use HasFactory;
    protected $table = 'article_contents';
    protected $guarded = ['thumb', 'permissions', 'tags'];
    protected $casts = [];
    protected $appends = ['permissions'];

    /**
     * 操作权限
     * @return bool[]
     * @throws BindingResolutionException
     */
    public function getPermissionsAttribute()
    {
        return [
            'create' => Auth::check() && Auth::user()->can('create', $this),
            'update' => Auth::check() && Auth::user()->can('update', $this),
            'delete' => Auth::check() && Auth::user()->can('delete', $this),
        ];
    }

    /**
     * 声明工厂类
     * @return Factory
     */
    protected static function newFactory()
    {
        return ContentFactory::new();
    }

    /**
     * 用户关联
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 标签的关联
     * @return BelongsToMany
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'article_tag_content')->withTimestamps();
    }

    /**
     * 栏目关联
     * @return BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * 微信消息多态关联
     * @return MorphOne
     */
    public function wechatMessage()
    {
        return $this->morphOne(WeChatMessage::class, 'message');
    }
}
