<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = 'roles';

    protected $fillable = [
        'name',
        'description',
        'reference',
    ];

    public function users()
    {
        return $this->hasManyThrough(User::class, UserRole::class, 'role_id', 'id', 'id', 'user_id');
    }

    public function user_roles()
    {
        return $this->hasMany(UserRole::class);
    }
}
