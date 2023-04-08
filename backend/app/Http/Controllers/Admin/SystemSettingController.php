<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SystemSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SystemSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $this->onlyAdmin();

        $systemSettings = SystemSetting::first();

        return response()->json($systemSettings, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SystemSetting  $systemSetting
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, SystemSetting $systemSetting)
    {
        $this->onlyAdmin();

        $validator = Validator::make($request->all(), [
            'company_name' => 'required|string|min:3|max:255',
            'company_address' => 'required|string|min:3|max:255',
            'company_email' => 'required|string|min:3|max:255',
            'company_phone_number' => 'required|string|min:3|max:255',
            'company_manager' => 'required|string|min:3|max:255',
            'company_tax_number' => 'required|string|min:3|max:255',
            'bank' => 'required|string|min:3|max:255',
            'bank_account_number' => 'required|string|min:3|max:255'
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'errors' => $validator->errors(),
            ];
            return response()->json($response, 422);
        }

        $systemSetting->fill($request->all())->save();

        return response()->json(['success' => true], 200);
    }

}
