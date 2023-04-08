<?php

namespace App\Http\Controllers\Admin;

use App\Models\File;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ImageStorageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $this->accessEmployee();

        $query = File::query();

        if ($request->input('search')) {
            $query->where('name', 'LIKE', '%' . escape_like($request->input('search')) . '%');
        }

        $images = $query->paginate($this->getPageLength($request));

        $result = [
            'items' => [],
            'pagination' => $this->getPaginationForJson($images),
        ];

        foreach ($images as $item) {
            $result['items'][] = [
                'id' => $item->id,
                'name' => $item->name,
                'path' => $item->path,
                'file_name' => $item->file_name,
                'file_type' => $item->file_type,
                'file_size' => $item->file_size,
                'created_at' => Carbon::create($item->created_at)->toDateString(),
                'updated_at' => Carbon::create($item->updated_at)->toDateString(),
            ];
        }

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
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }
        //return response()->json($request);
        $files = $request->allFiles();
        foreach ($files as $file) {
            return response()->json($this->storeImage($file, $request->get('name')), 200);
        }
    }

    public function storeImage($file, $name)
    {

        $fileName = $file->getClientOriginalName();
        $fileType = $file->extension();
        $fileSize = $file->getSize();

        $image = new File();
        $image->name = $name;
        $image->file_name = $fileName;
        $image->file_type = $fileType;
        $image->file_size = $fileSize;
        $image->path = $file->storeAs('uploaded_files', hash('md5', microtime()) . '.' . $fileType, 'public');

        $image->save();

        return [
            'id' => $image->id,
            'path' => $image->path,
            'originalName' => $fileName
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\File $file
     * @param Request $request
     */
    public function destroy(Request $request, $id)
    {
        $this->accessEmployee();

        $file = File::find($id);

        if ($file->delete()) {
            return response()->json(['success']);
        } else {
            return response()->json(['failed']);
        }
    }
}
