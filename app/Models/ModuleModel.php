<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

/**
 * 模块基础模块
 * @package App\Models
 */
class ModuleModel extends Model
{
    use HasFactory;

    /**
     * 站点过滤
     * @param mixed $query
     * @return mixed
     */
    public function scopeSite($query)
    {
        return $query->where('site_id', site('id'));
    }

    /**
     * 用户关联
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
