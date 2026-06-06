<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Validation\ValidationException;

class SettingService
{
    /**
     * Get the configured request email.
     *
     * @return Setting|null
     */
    public function getRequestEmail(): ?Setting
    {
        return Setting::where('key', 'request_email')->first();
    }

    /**
     * Set the request email for the first time.
     *
     * @param string $email
     * @return Setting
     * @throws ValidationException
     */
    public function setRequestEmail(string $email): Setting
    {
        if (Setting::where('key', 'request_email')->exists()) {
            throw ValidationException::withMessages([
                'email' => ['O e-mail de recebimento já está configurado.']
            ]);
        }

        return Setting::create([
            'key' => 'request_email',
            'value' => $email
        ]);
    }

    /**
     * Update the configured request email.
     *
     * @param string $email
     * @return Setting
     * @throws ValidationException
     */
    public function updateRequestEmail(string $email): Setting
    {
        $setting = Setting::where('key', 'request_email')->first();

        if (!$setting) {
            throw ValidationException::withMessages([
                'email' => ['O e-mail de recebimento ainda não foi configurado.']
            ]);
        }

        $setting->update([
            'value' => $email
        ]);

        return $setting;
    }
}
