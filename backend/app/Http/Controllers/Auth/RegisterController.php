<?php

namespace App\Http\Controllers\Auth;

use App\Mail\PasswordResetMail;
use App\Mail\UserVerifyMail;
use App\Models\Book;
use App\Models\BookAuthor;
use App\Models\BookCategory;
use App\Models\Category;
use App\Models\ShippingAddress;
use App\Models\SubscriptionType;
use App\Models\UserRole;
use App\Models\UserVerify;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Dirape\Token\Token;

class RegisterController extends BaseController
{


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
        $input['is_active'] = 0;

        $user = User::create($input);
        //Szerepkör hozzáadása
        $user->user_roles()->create([
            'role_id' => 2
        ]);

        $token = new Token();
        $token = $token->Unique('users_verify', 'token', 32);

        UserVerify::create([
            'user_id' => $user->id,
            'token' => $token,
            'expires_at' => now()->addDay(),

        ]);

        if ($this->userVerifyMail($user, $request->input('url') . '/' . $token)) {
            return response()->json(['success' => true], 200);
        }
        return response()->json(['success' => false], 200);
    }

    public function userVerifyMail($user, $url)
    {
        $user = User::find($user->id);

        $mailData = [
            'title' => 'Kedves ' . $user->name . '!',
            'body' => 'A regisztráció véglegesítéséhez kérünk kattints az alábbi linkre!',
            'url' => $url
        ];

        return Mail::to($user->email)->send(new UserVerifyMail($mailData));
    }


    public function userVerify(Request $request): \Illuminate\Http\JsonResponse
    {
        $userVerify = UserVerify::where('token', '=', $request->input('token'))->first();
        $user = User::find($userVerify->user_id ?? null);

        if (is_null($user)) {
            return response()->json(['success' => false], 200);
        } else {
            if ($user->is_active) {
                return response()->json(['success' => false], 200);
            }
            if (strtotime($userVerify->expires_at) > strtotime(now())) {
                $user->is_active = 1;
                $user->save();
                return response()->json(['success' => true], 200);
            } else {
                $user->delete();
                return response()->json(['success' => false], 200);
            }
        }
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
            if (Auth::user()->is_active) {
                $user = Auth::user();
                $success['token'] = $user->createToken('LandBooks')->plainTextToken;
                $success['user_id'] = $user->id;
                $success['name'] = $user->username;
                $success['email'] = $user->email;
                $success['roles'] = $user->roles->pluck('reference');

                return $this->sendResponse($success);
            } else{
                return response()->json(['success' => false], 401);
            }
        } else {
            return response()->json(['success' => false], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json('Success');
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function passwordReset(Request $request): JsonResponse
    {
        $email = $request->input('email');
        $user = User::where('email', '=', $email)->first();

        if ($user) {
            $token = new Token();
            $token = $token->Unique('password_resets', 'token', 32);
            $url = $request->input('url') . '/' . $email . '/' . $token;

            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token,
                'created_at' => now(),
            ]);

            $mailData = [
                'title' => 'Tisztelt Címzett!',
                'body' => 'Jelszó helyreállítási kérelem érkezett hozzánk az Ön email címének a megadásával. Amennyiben ez nem felel meg a valóságnak, kérjük levelünket tekintse tárgytalannak.',
                'url' => $url
            ];

            if (Mail::to($email)->send(new PasswordResetMail($mailData))) {
                return response()->json(['success' => true], 200);
            } else {
                return response()->json(['success' => false], 200);
            }
        }
        return response()->json(['success' => false], 200);
    }

    public function newPassword(Request $request): JsonResponse
    {
        //token ellenorzes
        $token = DB::table('password_resets')->where('token', '=', $request->input('token'))->first();

        if ($token) {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|min:8',
                'c_password' => 'required|same:password',
            ]);

            if ($validator->fails()) {
                $response = [
                    'success' => false,
                    'errors' => $validator->errors(),
                ];
                return response()->json($response, 422);
            }

            $user = User::where('email', '=', $request->input('email'))->first();
            $user->password = Hash::make($request->input('password'));
            $user->save();

            DB::table('password_resets')->where('token', '=', $request->input('token'))->delete();

            return response()->json(['success' => true], 200);
        } else {
            return response()->json(['success' => false], 200);
        }
    }
}
