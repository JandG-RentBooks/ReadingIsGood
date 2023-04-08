<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {

    }

    /**
     * @return JsonResponse|void
     */
    protected function onlyAdmin()
    {
        if (!auth()->user()->hasRole('admin')) {
            return response()->json([], 404);
        }
    }

    /**
     * @return JsonResponse|void
     */
    protected function accessEmployee()
    {
        if (!auth()->user()->hasRole('admin') || !auth()->user()->hasRole('employee')) {
            return response()->json([], 404);
        }
    }

    /**
     * @param Request $request
     *
     * @return int
     */
    protected function getPageLength(Request $request): int
    {
        return in_array($request->input('page_length'), config('pagination.page_lengths'))
            ? (int)$request->input('page_length')
            : (int)config('pagination.default_page_length');
    }

    /**
     * @param LengthAwarePaginator $collection
     *
     * @return array
     */
    protected function getPaginationForJson(LengthAwarePaginator $collection): array
    {
        return [
            'total' => $collection->total(),
            'last_page' => $collection->lastPage(),
            'current_page' => $collection->currentPage(),
            'per_page' => $collection->perPage(),
            'links' => $collection->linkCollection(),
        ];
    }

    /**
     * @param Request $request
     *
     * @return array|null
     */
    protected function getOrderFromRequest(Request $request): ?array
    {
        $allowedDirection = ['asc', 'desc'];
        if ($request->input('order')) {
            $order = json_decode($request->input('order'), true);
            if (is_array($order) && isset($order['field'])) {
                $column = mb_strtolower($order['field']);
                $direction = mb_strtolower($order['dir'] ?? '');
                if (!in_array($direction, $allowedDirection)) {
                    $direction = 'asc';
                }

                return [
                    'column' => $column,
                    'dir' => $direction,
                ];
            }
        }

        return null;
    }

}
