<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\RegisterController;

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::post('/password/email', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/password/reset', [PasswordResetController::class, 'reset']);
Route::middleware('auth:sanctum')->group(function () {
  Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify');
  Route::post('/email/resend', [VerificationController::class, 'resend'])->name('verification.resend');
});
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
  Route::get('/admin', [AdminController::class, 'index']);
});
