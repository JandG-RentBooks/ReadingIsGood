<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CoverType extends Model
{
    use HasFactory;

    protected $table = 'cover_types';

    protected $fillable = [
        'name'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function books()
    {
        return $this->hasMany(Book::class);
    }

    public function isUsed(): bool
    {
        return $this->books()->count() > 0;
    }
}
