<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use \App\User;

Route::post('/get_token', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required'
    ]);
 
    $user = User::where('email', $request->email)->first();
 
    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return $user->createToken($request->device_name)->plainTextToken;
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->post('/send', function (Request $request) {
    $user = User::where('id', $request->id)->first();
    $user->coins = $request->coins;
    $user->onClick = $request->onClick;
    $user->bought = $request->bought;
    $user->save();
    return 200;
});

/*
Route::middleware('auth:sanctum')->get('/book/all', 'BookController@all');
Route::middleware('auth:sanctum')->post('/book/add', 'BookController@add');
Route::middleware('auth:sanctum')->get('/book/delete/{id}', 'BookController@delete');
Route::middleware('auth:sanctum')->get('/book/change_availability/{id}', 'BookController@changeAvailability');
*/