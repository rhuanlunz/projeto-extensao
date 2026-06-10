@component('mail::message')
# Novo requerimento de mapeamento de recurso

Um usuário enviou uma solicitação para mapeamento de novo recurso.

**Solicitante:** {{ $user->name }}  
**E-mail:** {{ $user->email }}  
**Recurso:** {{ $resourceRequest['resource'] }}  
**Descrição:** {{ $resourceRequest['description'] }}
@endcomponent
