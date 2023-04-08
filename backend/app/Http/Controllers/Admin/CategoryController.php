<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->accessEmployee();

        $query = Category::query();

        if ($request->input('search')) {
            $query->where('name', 'LIKE', '%' . escape_like($request->input('search')) . '%');
        }

        $categories = $query->whereNull('parent_id')->paginate($this->getPageLength($request));

        $result = [
            'items' => [],
            'pagination' => $this->getPaginationForJson($categories),
        ];

        foreach ($categories as $category) {
            $result['items'][] = [
                'id' => $category->id,
                'name' => $category->name,
                'created_at' => Carbon::create($category->created_at)->toDateString(),
                'updated_at' => Carbon::create($category->updated_at)->toDateString(),
                'can_delete' => $category->books()->count() == 0,
                'children' => $this->getChildren($category->id)
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

        return response()->json(['parents' => $this->getParents()]);
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
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        Category::create($request->all());

        return response()->json(['success' => true], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param Category $category
     * @return JsonResponse
     */
    public function show(Request $request, Category $category)
    {
        $this->accessEmployee();

        //A kapcsolódó könyvekkel tér vissza
        return response()->json(Category::where('id', $category->id)->with('parent')->with('books')->get());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Request $request
     * @param Category $category
     * @return JsonResponse
     */
    public function edit(Request $request, Category $category)
    {
        $this->accessEmployee();

        $response = [
            'items' => Category::where('id', $category->id)->with('parent')->get(),
            'parents' => $this->getParents()
        ];

        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Category $category
     * @return JsonResponse
     */
    public function update(Request $request, Category $category)
    {
        $this->accessEmployee();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        $category->fill($request->only('name', 'parent_id'))->save();

        return response()->json(['success' => true], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return JsonResponse
     */
    public function destroy(Request $request, Category $category)
    {
        $this->accessEmployee();

        if ($category->books()->count() == 0) {
            $category->delete();

            return response()->json(['success']);
        } else {
            return response()->json(['failed']);
        }
    }

    private function getParents()
    {
        return Category::whereNull('parent_id')->get();
    }

    private function getChildren($id)
    {
        return Category::where('parent_id', $id)->get();
    }


}
