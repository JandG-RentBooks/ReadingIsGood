<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'books';

    protected $fillable = [
        'title',
        'description',
        'published',
        'number_of_page',
        'isbn_code',
        'in_stock',
        'available',
        'publisher_id',
        'language_id',
        'cover_type_id',
        'file_id',
        'is_new',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $dates = ['deleted_at'];

    public function coverType()
    {
        return $this->belongsTo(CoverType::class, 'cover_type_id');
    }

    public function language()
    {
        return $this->belongsTo(Language::class, 'language_id');
    }

    public function file()
    {
        return $this->belongsTo(File::class, 'file_id');
    }

    public function publisher()
    {
        return $this->belongsTo(Publisher::class, 'publisher_id');
    }

    public function lendings(): HasManyThrough
    {
        return $this->hasManyThrough(Lending::class, LendingBook::class, 'book_id', 'id', 'id', 'lending_id');
    }

    public function authors(): HasManyThrough
    {
        return $this->hasManyThrough(Author::class, BookAuthor::class, 'book_id', 'id', 'id', 'author_id');
    }

    public function categories(): HasManyThrough
    {
        return $this->hasManyThrough(Category::class, BookCategory::class, 'book_id', 'id', 'id', 'category_id');
    }

    public function labels(): HasManyThrough
    {
        return $this->hasManyThrough(Label::class, BookLabel::class, 'book_id', 'id', 'id', 'label_id');
    }


}
