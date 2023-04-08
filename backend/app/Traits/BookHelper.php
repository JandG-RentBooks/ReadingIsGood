<?php

namespace App\Traits;

use App\Models\Category;
use App\Models\File;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

trait BookHelper
{

    public function getRelatedLendings($book)
    {
        return $book->lendings()->get();
    }

    public function getRelatedAuthors($book)
    {
        return $book->authors()->get();
    }

    public function getRelatedCategories($book)
    {
        return $book->categories()->get();
    }

    public function getRelatedLabels($book)
    {
        return $book->labels()->get();
    }

    public function getPotentialCategories(): array
    {
        $query = Category::query();
        $categories = $query->whereNull('parent_id')->get();

        $result = [];

        foreach ($categories as $category) {
            $result[] = [
                'id' => $category->id,
                'name' => $category->name,
                'children' => Category::select('categories.id', 'categories.name')->where('parent_id', $category->id)->get()
            ];
        }

        return $result;
    }

    public function getImages(Request $request): JsonResponse
    {
        $query = File::query();

        if ($request->input('search')) {
            $query->where('name', 'LIKE', '%' . escape_like($request->input('search')) . '%');
        }

        $images = $query->get();

        return response()->json($images, 200);
    }

    public function isInWishList($bookId): bool
    {
        $query = Wishlist::where('user_id', '=', auth()->user()->id ?? null)->where('book_id', $bookId)->count();
        return $query > 0;
    }
}
