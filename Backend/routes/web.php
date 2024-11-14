<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TenderController;


Route::get('/', function () {
    return view('welcome');
});



Route::prefix('/api/tenders')->group(function () {

    Route::post('/', [TenderController::class, 'store']);

    Route::get('/', [TenderController::class, 'index']);

    Route::get('/{id}', [TenderController::class, 'show']);
});
