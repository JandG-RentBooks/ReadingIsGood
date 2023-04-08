<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionType;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriptionTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->accessEmployee();

        $query = SubscriptionType::query();

        if ($request->input('search')) {
            $query->where('name', 'LIKE', '%' . escape_like($request->input('search')) . '%');
        }

        $types = $query->paginate($this->getPageLength($request));

        $result = [
            'items' => [],
            'pagination' => $this->getPaginationForJson($types),
        ];

        foreach ($types as $type) {
            $result['items'][] = [
                'id' => $type->id,
                'book_number' => $type->book_number,
                'description' => $type->description,
                'price' => $type->price,
                'created_at' => Carbon::create($type->created_at)->toDateString(),
                'updated_at' => Carbon::create($type->updated_at)->toDateString(),
                'can_delete' => $type->users()->count() == 0,
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
            'book_number' => 'required|int',
            'description' => 'required|string|max:255',
            'price' => 'required',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        SubscriptionType::create($request->all());

        return response()->json(['success' => true], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param SubscriptionType $type
     * @return JsonResponse
     */
    public function show(Request $request, $id)
    {
        $this->accessEmployee();

        return response()->json(SubscriptionType::where('id', $id)->with('users')->first());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param SubscriptionType $type
     * @return JsonResponse
     */
    public function edit(Request $request, $id)
    {
        $this->accessEmployee();

        return response()->json(SubscriptionType::where('id', $id)->first());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $this->accessEmployee();

        $validator = Validator::make($request->all(), [
            'book_number' => 'required|int',
            'description' => 'required|string|max:255',
            'price' => 'required',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }
        $type = SubscriptionType::find($id);
        $type->fill($request->all())->save();

        return response()->json(['success' => true], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $this->accessEmployee();

        $type = SubscriptionType::find($id);

        if ($type->users()->count() == 0) {
            $type->delete();

            return response()->json(['success']);
        } else {
            return response()->json(['failed']);
        }
    }
}
