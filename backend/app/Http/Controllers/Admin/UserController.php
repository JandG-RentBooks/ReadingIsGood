<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {

        $query = User::query();
        $query->with('subscription_type')
            ->with('active_shipping_address')
            ->with('roles');

        if ($request->input('search')) {
            $query->where('name', 'LIKE', '%' . escape_like($request->input('search')) . '%');
        }

        if ($request->get('status') == 'archived') {
            $query->onlyTrashed();
        }

        $user = $query->paginate($request->page_length);

        return response()->json($user);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $this->onlyAdmin();

        //Felhasználó létrehozásához szükséges adatok
        //User szerepkörrel nem hozható létre
        $data['roles'] = Role::where('reference', '<>', 'user')->get();
        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $this->onlyAdmin();

        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:3|max:255',
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:8|max:255',
            'address' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:255',
            'role_id' => 'required|exists:roles,id',
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

        $user = User::create($input);

        //Szerepkör hozzáadása
        $user->user_roles()->create([
            'role_id' => $request->get('role_id')
        ]);

        return response()->json(['success' => true, 'id' => $user->id,], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function show(Request $request, int $id)
    {
        $this->onlyAdmin();

        $user = User::with('subscription_type')
            ->with('active_shipping_address')
            ->with('roles')
            ->where('id', $id)->get();

        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function edit(Request $request, $id)
    {
        $this->onlyAdmin();

        $user = User::with('subscription_type')
            ->with('active_shipping_address')
            ->with('roles')
            ->where('id', $id)->get();

        $data['user'] = $user;
        $data['roles'] = Role::all();

        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, User $user)
    {
        $this->onlyAdmin();


        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|string|email|max:255', Rule::unique('users')->ignore($user->id ?? 0),
            'password' => 'nullable|min:8|max:255',
            'address' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:255',
            'role_id' => 'required|exists:roles,id',
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        $user->fill($request->only('name', 'email', 'address', 'phone_number'));
        $user->is_active = $request->input('is_active');

        if (!empty($request->input('password'))) {
            $validator = Validator::make([$request->input('password')], [
                'password' => 'min:8|max:255',
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

        $user_role = $user->user_roles()->where('user_id', $user->id)->first();
        $user_role->delete();
        //Szerepkör hozzáadása
        $user->user_roles()->create([
            'role_id' => $request->get('role_id')
        ]);

        $user->fresh();

        $data['success'] = true;
        $data['user'] = User::with('subscription_type')
            ->with('active_shipping_address')
            ->with('roles')
            ->where('id', $user->id)->get();

        $data['roles'] = Role::all();

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(Request $request, User $user)
    {
        $this->onlyAdmin();

        if ($user->delete()) {
            return response()->json(['success']);
        } else {
            return response()->json(['failed']);
        }
    }
}
