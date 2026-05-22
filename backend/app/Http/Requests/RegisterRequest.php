<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'regex:/^[\pL\s]+$/u'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'max:300', 'confirmed'],
            'password_confirmation' => ['required', 'string', 'min:8', 'max:300'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
