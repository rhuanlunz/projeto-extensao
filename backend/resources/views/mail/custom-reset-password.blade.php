<x-mail::message>

# Redefinição de senha

Olá, {{ $user->name }}.

Recebemos uma solicitação para redefinir a senha da sua conta.

Clique no botão abaixo para criar uma nova senha:

<x-mail::button :url="$url">
Redefinir senha
</x-mail::button>

Este link expirará em {{ config('auth.passwords.users.expire') }} minutos.

Se você não solicitou a redefinição de senha, nenhuma ação adicional é necessária.

Obrigado,<br>
{{ config('app.name') }}
</x-mail::message>
