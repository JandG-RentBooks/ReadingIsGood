<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CoverType;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CoverTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->accessEmployee();

        $query = CoverType::query();

        if ($request->input('search')) {
            $query->where('name', 'LIKE', '%' . escape_like($request->input('search')) . '%');
        }

        $coverTypes = $query->paginate($this->getPageLength($request));

        $result = [
            'items' => [],
            'pagination' => $this->getPaginationForJson($coverTypes),
        ];

        foreach ($coverTypes as $coverType) {
            $result['items'][] = [
                'id' => $coverType->id,
                'name' => $coverType->name,
                'created_at' => Carbon::create($coverType->created_at)->toDateString(),
                'updated_at' => Carbon::create($coverType->updated_at)->toDateString(),
                'can_delete' => !$coverType->isUsed(),
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

        CoverType::create($request->all());

        return response()->json(['success' => true], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param CoverType $coverType
     * @return JsonResponse
     */
    public function show(Request $request, CoverType $coverType)
    {
        $this->accessEmployee();

        //A kapcsolódó könyvekkel tér vissza
        return response()->json(CoverType::where('id', $coverType->id)->with('books')->get());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param CoverType $coverType
     * @return JsonResponse
     */
    public function edit(Request $request, CoverType $coverType)
    {
        $this->accessEmployee();

        return response()->json($coverType->attributesToArray());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param CoverType $coverType
     * @return JsonResponse
     */
    public function update(Request $request, CoverType $coverType)
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

        $coverType->fill($request->only('name'))->save();

        return response()->json(['success' => true], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param CoverType $coverType
     * @return JsonResponse
     */
    public function destroy(Request $request, CoverType $coverType)
    {
        $this->accessEmployee();

        if ($coverType->books()->count() == 0) {
            $coverType->delete();

            return response()->json(['success']);
        } else {
            return response()->json(['failed']);
        }
    }
}
