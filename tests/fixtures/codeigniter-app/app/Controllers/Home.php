<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        return view('form', ['emailError' => null]);
    }

    public function store(): string
    {
        if (! $this->validate(['email' => 'required|valid_email'])) {
            return view('form', [
                'emailError' => $this->validator->getError('email'),
            ]);
        }

        return view('form', [
            'emailError' => null,
            'saved'      => true,
        ]);
    }
}
