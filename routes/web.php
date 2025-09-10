<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\InscriptionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/{any}', function () {
    return view('Home');
})->where('any', '.*');

Route::get('/register', function () {
    return Inertia('components/client/Register');
})->name('register.show');

Route::post('/register', [InscriptionController::class, 'store'])->name('register.store');
