<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\File;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->accessEmployee();

        $query = Author::query();

        if ($request->input('search')) {
            $query->where('name', 'LIKE', '%' . escape_like($request->input('search')) . '%');
        }

        $authors = $query->paginate($this->getPageLength($request));

        $result = [
            'items' => [],
            'pagination' => $this->getPaginationForJson($authors),
        ];

        foreach ($authors as $author) {
            $result['items'][] = [
                'id' => $author->id,
                'name' => $author->name,
                'birthday' => $author->birthday,
                'created_at' => Carbon::create($author->created_at)->toDateString(),
                'updated_at' => Carbon::create($author->updated_at)->toDateString(),
                'can_delete' => $author->books()->count() == 0,
            ];
        }

        return response()->json($result, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return void
     */
    public function create()
    {
        $this->accessEmployee();
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
            'name' => 'required|string|min:3|max:255',
            'birthday' => 'nullable|int',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        Author::create($request->all());

        return response()->json(['success' => true], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param Author $author
     * @return JsonResponse
     */
    public function show(Request $request, Author $author)
    {
        $this->accessEmployee();

        //A kapcsolódó könyvekkel tér vissza
        return response()->json(Author::where('id', $author->id)->with('books')->get());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Request $request
     * @param Author $author
     * @return JsonResponse
     */
    public function edit(Request $request, Author $author)
    {
        $this->accessEmployee();

        return response()->json($author->attributesToArray());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param \App\Models\Author $author
     * @return JsonResponse
     */
    public function update(Request $request, Author $author)
    {
        $this->accessEmployee();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        $author->fill($request->only('name', 'birthday'))->save();

        return response()->json(['success' => true], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Author $author
     * @return JsonResponse
     */
    public function destroy(Request $request, Author $author)
    {
        $this->accessEmployee();

        if ($author->books()->count() == 0) {
            $author->delete();

            return response()->json(['success']);
        } else {
            return response()->json(['failed']);
        }
    }
}
