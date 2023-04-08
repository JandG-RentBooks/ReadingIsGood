<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'payment_id',
        'username',
        'name',
        'email',
        'password',
        'address',
        'phone_number',
        'subscription_type_id',
        'active_shipping_address_id',
        'last_payment_date',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $dates = ['deleted_at'];

    /**
     * @return HasManyThrough
     */
    public function roles(): HasManyThrough
    {
        return $this->hasManyThrough(Role::class, UserRole::class, 'user_id', 'id', 'id', 'role_id');
    }

    /**
     * @return HasMany
     */
    public function user_roles(): HasMany
    {
        return $this->hasMany(UserRole::class);
    }

    /**
     * @param $role_key
     *
     * @return bool
     */
    public function hasRole($role_key): bool
    {
        return $this->roles->contains('reference', $role_key);
    }

    /**
     * @return HasMany
     */
    public function wishlist(): HasMany
    {
        return $this->hasMany(Wishlist::class, 'user_id');
    }

    /**
     * @return HasMany
     */
    public function lendings(): HasMany
    {
        return $this->hasMany(Lending::class, 'user_id');
    }

    /**
     * @return HasMany
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'user_id');
    }

    /**
     * @return BelongsTo
     */
    public function subscription_type(): BelongsTo
    {
        return $this->belongsTo(SubscriptionType::class, 'subscription_type_id');
    }

    /**
     * @return BelongsTo
     */
    public function active_shipping_address(): BelongsTo
    {
        return $this->belongsTo(ShippingAddress::class, 'active_shipping_address_id');
    }

    /**
     * @return HasMany
     */
    public function shipping_address(): HasMany
    {
        return $this->hasMany(ShippingAddress::class, 'user_id');
    }


}
