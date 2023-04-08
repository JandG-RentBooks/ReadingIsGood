<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Book;
use App\Models\BookAuthor;
use App\Models\BookCategory;
use App\Models\BookLabel;
use App\Models\Category;
use App\Models\CoverType;
use App\Models\File;
use App\Models\Label;
use App\Models\Language;
use App\Models\Publisher;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Traits\BookHelper;

class BookController extends Controller
{
    use BookHelper;
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->accessEmployee();

        $query = Book::query();
        $query = $query->leftJoin('languages', 'books.language_id', '=', 'languages.id');
        $query = $query->leftJoin('cover_types', 'books.cover_type_id', '=', 'cover_types.id');
        $query = $query->leftJoin('publishers', 'books.publisher_id', '=', 'publishers.id');
        $query = $query->leftJoin('files', 'books.file_id', '=', 'files.id');
        $query = $query->with('authors');

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
            $query->where('title', 'LIKE', '%' . escape_like($request->input('search')) . '%');
        }

        if ($request->get('status') == 'archived') {
            $query->onlyTrashed();
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
                'created_at' => Carbon::create($book->created_at)->toDateString(),
                'updated_at' => Carbon::create($book->updated_at)->toDateString(),
               // 'can_delete' => $this->getRelatedLendings($book)->count() == 0, //Nem törölhető, ha szerepel
                'can_delete' => true,
                'authors' => $strAuthors,
                'categories' => $strCategories,
                'labels' => $strLabels,
            ];
        }

        return response()->json($result, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return JsonResponse
     */
    public function create()
    {
        $this->accessEmployee();

        $result = [
            'categories' => $this->getPotentialCategories(),
            'labels' => Label::select('labels.id', 'labels.name')->get(),
            'authors' => Author::select('authors.id', 'authors.name', 'authors.birthday')->get(),
            'publishers' => Publisher::select('publishers.id', 'publishers.name')->get(),
            'languages' => Language::select('languages.id', 'languages.name')->get(),
            'cover_types' => CoverType::select('cover_types.id', 'cover_types.name')->get(),
        ];

        return response()->json($result, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $this->accessEmployee();

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:65535',
            'published' => 'required',
            'number_of_page' => 'required',
            'isbn_code' => 'required|string|unique:books',
            'in_stock' => 'required',
            'publisher_id' => 'nullable|exists:publishers,id',
            'language_id' => 'nullable|exists:languages,id',
            'cover_type_id' => 'nullable|exists:cover_types,id',
            'file_id' => 'nullable|exists:files,id',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        $book = Book::create($request->all());

        //book_author
        foreach($request->get('authors') as $author){
            BookAuthor::create(['book_id' => $book->id, 'author_id' => $author]);
        }
        //book_category
        BookCategory::create(['book_id' => $book->id, 'category_id' => $request->get('mainCategory')]);
        foreach($request->get('categories') as $category){
            BookCategory::create(['book_id' => $book->id, 'category_id' => $category]);
        }
        //book_label
        foreach($request->get('labels') as $label){
            BookLabel::create(['book_id' => $book->id, 'label_id' => $label]);
        }

        return response()->json(['success' => true], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param Book $book
     * @return JsonResponse
     */
    public function show(Request $request, Book $book)
    {
        $this->accessEmployee();

        $response = [
            'item' => Book::where('id', $book->id)->with('coverType')->with('language')->get(),
            'authors' => $this->getRelatedAuthors($book),
            'categories' => $this->getRelatedCategories($book),
            'labels' => $this->getRelatedLabels($book),
        ];

        return response()->json($response);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Book $book
     * @return JsonResponse
     */
    public function edit(Request $request, Book $book)
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

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Book $book
     * @return JsonResponse
     */
    public function update(Request $request, Book $book)
    {
        $this->accessEmployee();

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:65535',
            'published' => 'required',
            'number_of_page' => 'required',
            'isbn_code' => 'required|string', Rule::unique('books')->ignore($user->id ?? 0),
            'in_stock' => 'required',
            'publisher_id' => 'nullable|exists:publishers,id',
            'language_id' => 'nullable|exists:languages,id',
            'cover_type_id' => 'nullable|exists:cover_types,id',
            'file_id' => 'nullable|exists:files,id',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        $book->fill($request->all())->save();

        //book_author
        BookAuthor::where('book_id', $book->id)->delete();
        foreach($request->get('authors') as $author){
            BookAuthor::create(['book_id' => $book->id, 'author_id' => $author]);
        }
        //book_category
        BookCategory::where('book_id', $book->id)->delete();
        BookCategory::create(['book_id' => $book->id, 'category_id' => $request->get('mainCategory')]);
        foreach($request->get('categories') as $category){
            BookCategory::create(['book_id' => $book->id, 'category_id' => $category]);
        }
        //book_label
        BookLabel::where('book_id', $book->id)->delete();
        foreach($request->get('labels') as $label){
            BookLabel::create(['book_id' => $book->id, 'label_id' => $label]);
        }

        return response()->json(['success' => true], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Book $book
     * @return JsonResponse
     */
    public function destroy(Request $request, Book $book)
    {
        $this->accessEmployee();

        if ($book->delete()) {
            return response()->json(['success']);
        } else {
            return response()->json(['failed']);
        }

    }

}
