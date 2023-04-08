<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\CoverType;
use App\Models\Label;
use App\Models\Language;
use App\Models\Publisher;
use App\Models\Wishlist;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Traits\BookHelper;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    use BookHelper;

    public function index(Request $request)
    {
        $query = Book::query();
        $query = $query->leftJoin('languages', 'books.language_id', '=', 'languages.id');
        $query = $query->leftJoin('cover_types', 'books.cover_type_id', '=', 'cover_types.id');
        $query = $query->leftJoin('publishers', 'books.publisher_id', '=', 'publishers.id');
        $query = $query->leftJoin('files', 'books.file_id', '=', 'files.id');
        $query = $query->with('authors');
        $query = $query->with('categories');

        $query = $query->select(
            'books.*',
            'languages.id as language_id',
            'languages.name as language_name',
            'cover_types.name as cover_type_name',
            'cover_types.id as cover_type_id',
            'publishers.name as publisher',
            'publishers.id as publisher_id',
            'files.id as file_id',
            'files.name as file_name',
            'files.path as file_path',

        );

        if ($request->input('search')) {
            $query = $query->whereRelation('authors', 'name', 'LIKE', '%' . escape_like($request->input('search')) . '%');
            $query = $query->orWhere('title', 'LIKE', '%' . escape_like($request->input('search')) . '%');
        }

        if ($request->input('category')) {
            $query = $query->whereRelation('categories', 'categories.id', '=', $request->input('category'));
        }



        $books = $query->paginate($this->getPageLength($request));

        $result = [
            'items' => [],
            'pagination' => $this->getPaginationForJson($books),
        ];

        foreach ($books as $book) {
            $authors = $this->getRelatedAuthors($book)->pluck('name')->toArray();
            $strAuthors = implode(', ', $authors);
            $categories = $this->getRelatedCategories($book)->pluck('name')->toArray();
            $strCategories = implode(', ', $categories);
            $labels = $this->getRelatedLabels($book)->pluck('name')->toArray();
            $strLabels = implode(', ', $labels);


            $result['items'][] = [
                'id' => $book->id,
                'title' => $book->title,
                'description' => $book->description,
                'publisher' => $book->publisher,
                'published' => $book->published,
                'number_of_page' => $book->number_of_page,
                'isbn_code' => $book->isbn_code,
                'in_stock' => $book->in_stock,
                'available' => $book->available,
                'is_new' => $book->is_new,
                'language_id' => $book->language_id,
                'language_name' => $book->language_name,
                'cover_type_id' => $book->cover_type_id,
                'cover_type_name' => $book->cover_type_name,
                'file_id' => $book->file_id,
                'file_name' => $book->file_name,
                'file_path' => $book->file_path,
                'authors' => $strAuthors,
                'categories' => $strCategories,
                '_categories' => $categories,
                'labels' => $strLabels,
                '_labels' => $labels,

            ];
        }

        return response()->json($result, 200);

    }

    public function details(Request $request, Book $book)
    {
        $this->accessEmployee();

        $response = [
            'item' => Book::where('id', $book->id)
                ->with('coverType')
                ->with('language')
                ->with('file')
                ->with('publisher')
                ->with('authors')
                ->with('categories')
                ->with('labels')
                ->first(),
            'categories' => $this->getPotentialCategories(),
            'labels' => Label::select('labels.id', 'labels.name')->get(),
            'authors' => Author::select('authors.id', 'authors.name', 'authors.birthday')->get(),
            'publishers' => Publisher::select('publishers.id', 'publishers.name')->get(),
            'languages' => Language::select('languages.id', 'languages.name')->get(),
            'cover_types' => CoverType::select('cover_types.id', 'cover_types.name')->get(),
        ];

        return response()->json($response);
    }

    public function changeWisListStatus(Request $request, Book $book): JsonResponse
    {
        $wishList = Wishlist::where('user_id', '=', auth()->user()->id ?? null)->where('book_id', $book->id)->first();

        if (!is_null($wishList)) {
            $wishList->delete();
        } else {
            Wishlist::create([
                'user_id' => auth()->user()->id,
                'book_id' => $book->id
            ]);
        }
        return response()->json(['success' => true], 200);
    }

    public function checkWisListStatus(Request $request, Book $book): JsonResponse
    {
        return response()->json(['isInWishlist' => $this->isInWishList($book->id)], 200);
    }

    public function getCategories(Request $request)
    {
        $query = Category::query();

        $categories = $query->whereNull('parent_id')->get();

        $result = [
            'items' => []
        ];

        foreach ($categories as $category) {
            $result['items'][] = [
                'id' => $category->id,
                'name' => $category->name,
                'children' => $this->getChildren($category->id)
            ];
        }

        return response()->json($result, 200);
    }

    private function getChildren($id)
    {
        return Category::where('parent_id', $id)->get();
    }
}
