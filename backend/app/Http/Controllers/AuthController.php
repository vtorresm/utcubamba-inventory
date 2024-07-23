<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(['message' => 'Login successful', 'user' => Auth::user()], 200);
        }

        // Check default users
        $defaultUsers = [
            [
                'email' => env('DEFAULT_USER1_EMAIL'),
                'password' => env('DEFAULT_USER1_PASSWORD'),
            ],
            [
                'email' => env('DEFAULT_USER2_EMAIL'),
                'password' => env('DEFAULT_USER2_PASSWORD'),
            ],
        ];

        foreach ($defaultUsers as $defaultUser) {
            if ($credentials['email'] === $defaultUser['email'] && $credentials['password'] === $defaultUser['password']) {
                $user = (object) ['name' => 'Default User', 'email' => $defaultUser['email']];
                return response()->json(['message' => 'Login successful', 'user' => $user], 200);
            }
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
