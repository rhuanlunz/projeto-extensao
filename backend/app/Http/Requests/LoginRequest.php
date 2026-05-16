<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'max:300']
        ];
    }

    public function messages(): array
    {
        return array(
            'email.required' => 'O campo e-mail é obrigatório.',
            'email.string' => 'O e-mail deve ser uma string válida.',
            'email.email' => 'Informe um endereço de e-mail válido.',
            'email.max' => 'O e-mail não pode ultrapassar 255 caracteres.',

            'password.required' => 'O campo senha é obrigatório.',
            'password.string' => 'A senha deve ser uma string válida.',
            'password.max' => 'A senha não pode ultrapassar 300 caracteres.'
        );
    }

    public function authorize(): bool
    {
        return true;
    }
}
