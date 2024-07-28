<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar la solicitud de login
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Llamada a la API externa
        $response = Http::post('https://api-externa.com/login', [
            'email' => $request->email,
            'password' => $request->password,
        ]);

        if ($response->successful()) {
            // API exitosa: logueo al usuario (aquí puede ser con JWT o sesiones)
            return response()->json(['message' => 'Login successful via API'], 200);
        }

        // Si la API falla, validar con usuarios por defecto
        if ($this->checkDefaultUsers($request->email, $request->password)) {
            return response()->json(['message' => 'Login successful with default user'], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    private function checkDefaultUsers($email, $password)
    {
        // Comprobar con los usuarios por defecto en .env
        $defaultUser1 = config('app.default_user_1_email') === $email && config('app.default_user_1_password') === $password;
        $defaultUser2 = config('app.default_user_2_email') === $email && config('app.default_user_2_password') === $password;

        return $defaultUser1 || $defaultUser2;
    }
}
