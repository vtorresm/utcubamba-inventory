<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['user' => $user], 201);
    }

    // public function login(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required|string|email',
    //         'password' => 'required|string',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json($validator->errors(), 400);
    //     }

    //     $user = User::where('email', $request->email)->first();

    //     if (!$user || !Hash::check($request->password, $user->password)) {
    //         return response()->json(['message' => 'Unauthorized'], 401);
    //     }

    //     return response()->json(['user' => $user], 200);
    // }

    private $loginAttempts = 0;
    private const MAX_ATTEMPTS = 3;

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Llamada a la API
        try {
            $response = Http::post('https://api.example.com/login', $credentials);
            if ($response->successful()) {
                // Autenticación exitosa con API
                return response()->json(['message' => 'Login exitoso con API'], 200);
            }
        } catch (\Exception $e) {
            // Si falla el API, proceder con los usuarios por defecto
            if ($this->checkDefaultUsers($credentials)) {
                return response()->json(['message' => 'Login exitoso con usuario por defecto'], 200);
            }
        }

        // Incrementar el contador de intentos fallidos
        $this->loginAttempts++;
        if ($this->loginAttempts >= self::MAX_ATTEMPTS) {
            return response()->json(['message' => 'Número máximo de intentos alcanzado'], 429); // Código 429: Demasiados intentos
        }

        return response()->json(['message' => 'Credenciales inválidas'], 401);
    }

    private function checkDefaultUsers($credentials)
    {
        $defaultUsers = [
            [
                'email' => env('DEFAULT_USER_1_EMAIL'),
                'password' => env('DEFAULT_USER_1_PASSWORD'),
            ],
            [
                'email' => env('DEFAULT_USER_2_EMAIL'),
                'password' => env('DEFAULT_USER_2_PASSWORD'),
            ]
        ];

        foreach ($defaultUsers as $user) {
            if ($credentials['email'] === $user['email'] && $credentials['password'] === $user['password']) {
                return true;
            }
        }

        return false;
    }
}

