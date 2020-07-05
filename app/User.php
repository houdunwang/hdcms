<?php

namespace App;

use App\Models\Group;
use App\Models\Site;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $guarded = [];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function getIsSuperAdminAttribute()
    {
        return $this->id == 1;
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function sites()
    {
        return $this->hasMany(Site::class);
    }
}
