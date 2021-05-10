<?php

namespace Modules\Shop\Entities;

use App\Models\ModuleModel;
use App\Models\User;
use Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * 类型的属性
 * @package Modules\Shop\Entities
 */
class ShopUser extends User
{
    protected $table = 'users';

    public static function user()
    {
        return self::find(Auth::id());
    }
    /**
     * 优惠券
     * @return BelongsToMany
     */
    public function coupons()
    {
        return $this->belongsToMany(Coupon::class, 'shop_user_coupon', 'user_id')->withTimestamps();
    }

    /**
     * 收货地址
     * @return HasMany
     */
    public function address()
    {
        return $this->hasMany(Address::class, 'user_id');
    }
}
