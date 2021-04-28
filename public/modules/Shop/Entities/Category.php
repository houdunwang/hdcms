<?php

namespace Modules\Shop\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * 商品栏目
 * @package Modules\Shop\Entities
 */
class Category extends Model
{
    use HasFactory;

    protected $table = "shop_categories";

    protected $fillable = ['site_id', 'title', 'preview', 'keywords', 'description', 'pid', 'unit'];

    protected $casts = ['is_show' => 'boolean'];

    protected $appends = ['levelTitle'];

    protected static function newFactory()
    {
        return \Modules\Shop\Database\factories\CategoryFactory::new();
    }

    /**
     * 带前缀的栏目名称
     * @return string
     */
    protected function getLevelTitleAttribute()
    {
        $level = count(explode('-', $this->path)) - 1;
        return str_repeat('-', $level * 3) . ' ' . $this->title;
    }

    public function scopeSite($query)
    {
        return $query->where('site_id', site('id'));
    }

    /**
     * 商品关联
     * @return HasMany
     */
    public function goods()
    {
        return $this->hasMany(Goods::class, 'category_id');
    }
}
