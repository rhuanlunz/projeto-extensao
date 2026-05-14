<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', 'alpha'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'max:300'],
            'password_confirmation' => ['required', 'string', 'min:8', 'max:300', 'confirmed:password'],
        ];
    }

    public function messages(): array
    {
        return array(
            'name.required' => 'O campo nome é obrigatório.',
            'name.string' => 'O nome deve ser uma string válida.',
            'name.max' => 'O nome não pode ultrapassar 255 caracteres.',
            'name.alpha' => 'O nome deve conter apenas letras.',

            'email.required' => 'O campo e-mail é obrigatório.',
            'email.string' => 'O e-mail deve ser uma string válida.',
            'email.email' => 'Informe um endereço de e-mail válido.',
            'email.max' => 'O e-mail não pode ultrapassar 255 caracteres.',
            'email.unique' => 'O e-mail informado não pode ser utilizado. Verifique os dados e tente novamente.',

            'password.required' => 'O campo senha é obrigatório.',
            'password.string' => 'A senha deve ser uma string válida.',
            'password.min' => 'A senha deve ter pelo menos 8 caracteres.',
            'password.max' => 'A senha não pode ultrapassar 300 caracteres.',

            'password_confirmation.required' => 'A confirmação de senha é obrigatória.',
            'password_confirmation.string' => 'A confirmação de senha deve ser uma string válida.',
            'password_confirmation.min' => 'A confirmação de senha deve ter pelo menos 8 caracteres.',
            'password_confirmation.max' => 'A confirmação de senha não pode ultrapassar 300 caracteres.',
            'password_confirmation.confirmed' => 'As senhas não coincidem.',
        );
    }

    public function authorize(): bool
    {
        return true;
    }
}
