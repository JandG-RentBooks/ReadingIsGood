<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Label;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LabelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->accessEmployee();

        $query = Label::query();

        if ($request->input('search')) {
            $query->where('name', 'LIKE', '%' . escape_like($request->input('search')) . '%');
        }

        $labels = $query->paginate($this->getPageLength($request));

        $result = [
            'items' => [],
            'pagination' => $this->getPaginationForJson($labels),
        ];

        foreach ($labels as $label) {
            $result['items'][] = [
                'id' => $label->id,
                'name' => $label->name,
                'created_at' => Carbon::create($label->created_at)->toDateString(),
                'updated_at' => Carbon::create($label->updated_at)->toDateString(),
                'can_delete' => $label->books()->count() == 0,
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

        Label::create($request->all());

        return response()->json(['success' => true], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param Label $label
     * @return JsonResponse
     */
    public function show(Request $request, Label $label)
    {
        $this->accessEmployee();

        //A kapcsolódó könyvekkel tér vissza
        return response()->json(Label::where('id', $label->id)->with('books')->get());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Label $label
     * @return JsonResponse
     */
    public function edit(Request $request, Label $label)
    {
        $this->accessEmployee();

        return response()->json($label->attributesToArray());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Label $label
     * @return JsonResponse
     */
    public function update(Request $request, Label $label)
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

        $label->fill($request->only('name'))->save();

        return response()->json(['success' => true], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Label $label
     * @return JsonResponse
     */
    public function destroy(Request $request, Label $label)
    {
        $this->accessEmployee();

        if ($label->books()->count() == 0) {
            $label->delete();

            return response()->json(['success']);
        } else {
            return response()->json(['failed']);
        }
    }
}
