<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\CoverType;
use App\Models\FrontPage;
use App\Models\Label;
use App\Models\Language;
use App\Models\Publisher;
use App\Models\SystemSetting;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getLastRented(Request $request): JsonResponse
    {
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

        )->where('is_new', 1);
        $query = $query->get();

        return response()->json($query, 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getTestimonials(Request $request): JsonResponse
    {
        $testimonials = Testimonial::with('user')->where('is_active', '=', 1)->orderBy('created_at', 'DESC')->limit(10)->get();

        return response()->json($testimonials, 200);
    }

    public function getReferences(Request $request): JsonResponse
    {
        $testimonials = Testimonial::with('user')->where('is_active', '=', 1)->orderBy('created_at', 'DESC')->paginate($this->getPageLength($request));

        $result = [
            'items' => $testimonials,
            'pagination' => $this->getPaginationForJson($testimonials),
        ];

        return response()->json($result, 200);
    }

    public function storeReference(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'description' => 'required',
            'rating' => 'required',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        Testimonial::create([
            'user_id' => auth()->user()->id,
            'description' => $request->input('description'),
            'rating' => $request->input('rating'),
        ]);
        return response()->json(['success' => true], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getCompany(Request $request): JsonResponse
    {
        return response()->json(SystemSetting::select('company_name')->first(), 200);
    }

    public function getPageContent(Request $request): JsonResponse
    {
        $content = FrontPage::where('reference', '=', $request->get('reference'))->first();

        return response()->json(['item' => $content], 200);
    }
}
