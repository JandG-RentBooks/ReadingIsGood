<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Publisher;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PublisherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->accessEmployee();

        $query = Publisher::query();

        if ($request->input('search')) {
            $query->where('name', 'LIKE', '%' . escape_like($request->input('search')) . '%');
        }

        $publishers = $query->paginate($this->getPageLength($request));

        $result = [
            'items' => [],
            'pagination' => $this->getPaginationForJson($publishers),
        ];

        foreach ($publishers as $publisher) {
            $result['items'][] = [
                'id' => $publisher->id,
                'name' => $publisher->name,
                'created_at' => Carbon::create($publisher->created_at)->toDateString(),
                'updated_at' => Carbon::create($publisher->updated_at)->toDateString(),
                'can_delete' => $publisher->books()->count() == 0,
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
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        Publisher::create($request->all());

        return response()->json(['success' => true], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param Publisher $publisher
     * @return JsonResponse
     */
    public function show(Request $request, Publisher $publisher)
    {
        $this->accessEmployee();

        //A kapcsolódó könyvekkel tér vissza
        return response()->json(Publisher::where('id', $publisher->id)->with('books')->get());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Publisher $publisher
     * @return JsonResponse
     */
    public function edit(Request $request, Publisher $publisher)
    {
        $this->accessEmployee();

        return response()->json($publisher->attributesToArray());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Publisher $publisher
     * @return JsonResponse
     */
    public function update(Request $request, Publisher $publisher)
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

        $publisher->fill($request->only('name'))->save();

        return response()->json(['success' => true], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Publisher $publisher
     * @return JsonResponse
     */
    public function destroy(Request $request, Publisher $publisher)
    {
        $this->accessEmployee();

        if ($publisher->books()->count() == 0) {
            $publisher->delete();

            return response()->json(['success']);
        } else {
            return response()->json(['failed']);
        }
    }
}
