<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InscriptionController;
use App\Http\Controllers\EvenementController;
use App\Http\Controllers\BilletController;
use App\Models\Billet;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [InscriptionController::class, 'store']);
Route::post('/login', [InscriptionController::class, 'login']);

Route::get('/evenements', [EvenementController::class, 'index']);
Route::get('/evenements/{id}', [EvenementController::class, 'show']);

Route::middleware('auth:api')->get('/tickets', [BilletController::class, 'index']);
Route::middleware('auth:api')->get('/tickets/{id}', [BilletController::class, 'show']);
