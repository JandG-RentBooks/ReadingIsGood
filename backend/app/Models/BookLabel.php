<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookLabel extends Model
{
    use HasFactory;

    protected $table = 'book_label';

    protected $fillable = [
        'book_id',
        'label_id',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function label()
    {
        return $this->belongsTo(Label::class, 'label_id');
    }
}
