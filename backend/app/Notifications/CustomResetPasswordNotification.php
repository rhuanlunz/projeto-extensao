<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;

class CustomResetPasswordNotification extends ResetPassword
{
    use Queueable;

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable): MailMessage
    {
        $url = config('app.frontend_url')."/autenticacao/redefinir-senha?token={$this->token}&email=$notifiable->email";

        return (new MailMessage)
            ->subject('Link de Redefinição de Senha')
            ->markdown('mail.custom-reset-password', [
                'url' => $url,
                'user' => $notifiable
            ]);
    }
}
