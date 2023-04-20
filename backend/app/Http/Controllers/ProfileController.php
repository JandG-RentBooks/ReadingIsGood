<?php

namespace App\Http\Controllers;

use App\Models\Lending;
use App\Models\Role;
use App\Models\ShippingAddress;
use App\Models\SubscriptionType;
use App\Models\SystemSetting;
use App\Models\Testimonial;
use App\Models\User;
use App\Models\Wishlist;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function getUser(Request $request)
    {
        $user = User::with('subscription_type')
            ->with('active_shipping_address')
            ->where('id', auth()->user()->id)->first();

        return response()->json($user, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'password' => 'nullable|min:8|max:255',
            'address' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:255'
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        $user = User::find(auth()->user()->id);

        $user->fill($request->only('name', 'address', 'phone_number'));

        if (!empty($request->input('password'))) {
            $validator = Validator::make([$request->input('password')], [
                'password' => 'min:8|max:255',
                'c_password' => 'required|same:password',
            ]);
            if ($validator->fails()) {
                $response = [
                    'success' => false,
                    'errors' => $validator->errors(),
                ];
                return response()->json($response, 422);
            }
            $user->password = Hash::make($request->input('password'));
        }

        $user->save();

        $data['success'] = true;
        $data['user'] = User::with('subscription_type')
            ->with('active_shipping_address')
            ->where('id', $user->id)->get();

        return response()->json($data);
    }

    public function getWishlist(Request $request)
    {
        $wishlist = Wishlist::join('books', 'books.id', '=', 'wishlists.book_id')
            ->select('wishlists.id as id', 'books.title as title')
            ->where('user_id', auth()->user()->id)
            ->orderBy('sort')
            ->get();

        return response()->json($wishlist, 200);
    }

    public function sortWishlist(Request $request)
    {
        $sort = 1;
        foreach ($request->input('wishlist') as $item) {
            //return $item['id'];
            $wishlist = Wishlist::find($item['id']);
            $wishlist->sort = $sort;
            $wishlist->save();
            $sort++;
        }
        return response()->json(['success' => true], 200);
    }

    public function removeWisList(Request $request): JsonResponse
    {
        $wishList = Wishlist::find($request->input('id'));

        if (!is_null($wishList)) {
            $wishList->delete();
        }
        return response()->json(['success' => true], 200);
    }

    public function getTestimonials(Request $request)
    {
        return response()->json(Testimonial::where('user_id', auth()->user()->id)->get(), 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getShippingAddresses(Request $request)
    {
        $shippingAddresses = ShippingAddress::where('user_id', auth()->user()->id)->get();
        $user = User::find(auth()->user()->id);
        $addresses = [
            'items' => $shippingAddresses,
            'active' => $user->active_shipping_address_id
        ];

        return response()->json($addresses, 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function storeShippingAddress(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'zip_code' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        ShippingAddress::create([
            'user_id' => auth()->user()->id,
            'zip_code' => $request->input('zip_code'),
            'city' => $request->input('city'),
            'address' => $request->input('address'),
        ]);

        return response()->json(['success' => true], 200);
    }

    public function updateShippingAddress(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'zip_code' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        $address = ShippingAddress::find($id);
        $address->fill($request->only('zip_code', 'city', 'address'))->save();

        return response()->json(['success' => true], 200);
    }

    public function updateActiveShippingAddress(Request $request)
    {
        $user = User::find(auth()->user()->id);
        $user->active_shipping_address_id = $request->input('shipping_address_id');
        $user->save();

        return response()->json(['success' => true], 200);
    }

    public function removeShippingAddress(Request $request, $id)
    {
        $address = ShippingAddress::find($id);

        if ($address->delete()) {
            return response()->json(['success']);
        } else {
            return response()->json(['failed']);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getSubscriptions(Request $request)
    {
        $user = User::with('subscription_type')
            ->where('id', auth()->user()->id)->first();

        $subscriptions = [
            'items' => SubscriptionType::all(),
            'subscription_type_id' => $user->subscription_type_id,
            'userData' => $user,
            'subscriptionIsValid' => Carbon::parse($user->last_payment_date)->addMonth()->addDays(5)->toDateString(),
            'systemSettings' => SystemSetting::first(),
        ];

        return response()->json($subscriptions, 200);
    }

    public function updateActiveSubscription(Request $request)
    {
        $user = User::find(auth()->user()->id);
        $user->subscription_type_id = $request->input('subscription_type_id');
        $user->save();

        return response()->json(['success' => true], 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getLendingHistory(Request $request)
    {
        $lendings = Lending::with('books')
            ->with('books.publisher')
            ->with('books.authors')
            ->with('user')
            ->with('user.subscription_type')
            ->with('user.active_shipping_address')
            ->where([
                ['user_id', auth()->user()->id],
                ['state', '=', 4],
            ])->orderByDesc('id')->get();

        return response()->json($lendings, 200);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getLending(Request $request)
    {
        $lending = Lending::with('books')
            ->with('books.publisher')
            ->with('books.authors')
            ->with('user')
            ->with('user.subscription_type')
            ->with('user.active_shipping_address')
            ->where([
                ['user_id', auth()->user()->id],
                ['state', '=', 3],
            ])->first();

        return response()->json($lending, 200);
    }

    public function dataCheck(Request $request)
    {
        $query = User::query();
        $query = $query->where('id', auth()->user()->id);
        $query = $query->with('wishlist');
        $user = $query->first();

        return response()->json(
            [
                'user' => $user,
                'last_payment_date' => $user->last_payment_date >= now()->subMonth()->subDays(5),
            ], 200
        );
    }
}
