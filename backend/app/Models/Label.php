<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Label extends Model
{
    use HasFactory;

    protected $table = 'labels';

    protected $fillable = [
        'name'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function books(): HasManyThrough
    {
        return $this->hasManyThrough(Book::class, BookLabel::class, 'label_id', 'id', 'id', 'book_id');
    }
}
