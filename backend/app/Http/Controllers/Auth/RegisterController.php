<?php

namespace App\Http\Controllers\Auth;

use App\Models\Book;
use App\Models\BookAuthor;
use App\Models\BookCategory;
use App\Models\Category;
use App\Models\ShippingAddress;
use App\Models\SubscriptionType;
use App\Models\UserRole;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Dirape\Token\Token;

class RegisterController extends BaseController
{

    public function roles()
    {
        $users = User::whereNotNull('email_verified_at')->get();
        foreach ($users as $user) {
            UserRole::create([
                'user_id' => $user->id,
                'role_id' => 2,
            ]);
        }
    }

    public function address()
    {
        $users = User::whereNotNull('email_verified_at')->get();
        foreach ($users as $user) {
            $user->last_payment_date = now();
            $address = ShippingAddress::where('user_id', $user->id)->first();
            if ($address) {
                $user->active_shipping_address_id = $address->id;
            }
            $user->save();
        }
    }

    public function wishlist()
    {
        $users = User::whereNotNull('email_verified_at')->get();
        foreach ($users as $user) {
            $rand = rand(6, 18);
            for ($i = 0; $i < $rand; $i++) {
                Wishlist::create([
                    'user_id' => $user->id,
                    'book_id' => rand(389, 588),
                ]);
            }
        }
    }


    public function book()
    {
        $books = Book::where('file_id', 49)->get();

//        foreach($books as $book){
//            BookAuthor::create([
//                'book_id' => $book->id,
//                'author_id' => rand(9, 108),
//            ]);
//        }

        //$mainCategories = Category::whereNull('parent_id')->pluck('id')->toArray();

//        foreach($books as $book){
//            $index = rand(0, count($mainCategories)-1);
//            BookCategory::create([
//                'book_id' => $book->id,
//                'category_id' => $mainCategories[$index],
//            ]);
//            BookCategory::create([
//                'book_id' => $book->id,
//                'category_id' => $this->getChild($mainCategories[$index])->id ?? 1,
//            ]);
//        }

    }

    public function getChild($id)
    {
        return Category::where('parent_id', '=', $id)->first();
    }

    public function index(Request $request)
    {
        return response()->json(SubscriptionType::all(), 200);
    }

    /**
     * Register api
     *
     * @return JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|max:255',
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|min:8',
            'c_password' => 'required|same:password',
            'address' => 'required|max:255',
            'phone_number' => 'nullable|max:255',
            'subscription_type_id' => 'nullable|exists:subscription_types,id',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $token = new Token();
        $input['payment_id'] = $token->Unique('users', 'payment_id', 8);

        $user = User::create($input);
        //Szerepkör hozzáadása
        $user->user_roles()->create([
            'role_id' => 2
        ]);

        return response()->json(['success' => true, 'id' => $user->id,], 200);
    }

    /**
     * Login api
     *
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['email', 'password']);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $success['token'] = $user->createToken('LandBooks')->plainTextToken;
            $success['name'] = $user->username;
            $success['roles'] = $user->roles->pluck('reference');

            return $this->sendResponse($success);
        } else {
            return response()->json(['success' => false], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json('Success');
    }
}
