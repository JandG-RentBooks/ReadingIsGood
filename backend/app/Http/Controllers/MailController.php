<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewLendingMail;

class MailController extends Controller
{
    public function newLending(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = User::find($request->get('user_id'));

        $mailData = [
            'title' => 'Kedves ' . $user->name . '!',
            'body' => 'Örömmel értesítünk, hogy a mai napon új csomagot küldtünk el részedre.',
            'shipping_token' => 'Szállítási azonosító: ' . $request->get('shipping_token'),
        ];

        Mail::to($user->email)->send(new NewLendingMail($mailData));

        return response()->json(['success' => true], 200);
    }
}
