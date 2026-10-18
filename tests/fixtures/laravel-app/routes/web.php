<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('form');
});

Route::post('/customers', function (Request $request) {
    $request->validate(['email' => ['required', 'email']]);

    return back()->with('saved', true);
});
