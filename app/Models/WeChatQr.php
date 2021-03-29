<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 微信二维码
 * @package App\Models
 */
class WeChatQr extends Model
{
    use HasFactory;
    protected $fillable = ['site_id', 'wechat_id', 'module_id', 'title', 'response',  'scene_type', 'scene_value', 'expire_seconds'];
    protected $casts = ['response' => 'array', 'wechat_id' => 'integer', 'expire_seconds' => 'integer'];
}
