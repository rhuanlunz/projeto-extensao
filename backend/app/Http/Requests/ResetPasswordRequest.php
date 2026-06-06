<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'token' => ['required'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'new_password' => ['required', 'string', 'min:8', 'max:300', 'confirmed'],
            'new_password_confirmation' => ['required', 'string', 'min:8', 'max:300'],
        ];
    }

    public function messages(): array
    {
        return [
            'token.required' => 'O token é obrigatório.',

            'email.required' => 'O campo e-mail é obrigatório.',
            'email.string' => 'O e-mail deve ser uma string válida.',
            'email.email' => 'Informe um endereço de e-mail válido.',
            'email.max' => 'O e-mail não pode ultrapassar 255 caracteres.',

            'new_password.required' => 'O campo senha é obrigatório.',
            'new_password.string' => 'A senha deve ser uma string válida.',
            'new_password.min' => 'A senha deve ter pelo menos 8 caracteres.',
            'new_password.max' => 'A senha não pode ultrapassar 300 caracteres.',
            'new_password.confirmed' => 'As senhas não coincidem.',

            'new_password_confirmation.required' => 'A confirmação de senha é obrigatória.',
            'new_password_confirmation.string' => 'A confirmação de senha deve ser uma string válida.',
            'new_password_confirmation.min' => 'A confirmação de senha deve ter pelo menos 8 caracteres.',
            'new_password_confirmation.max' => 'A confirmação de senha não pode ultrapassar 300 caracteres.'
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
