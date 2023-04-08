<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LendingBook extends Model
{
    use HasFactory;

    protected $table = 'lending_book';

    protected $fillable = [
        'lending_id',
        'book_id',
        'is_back',
    ];
}
