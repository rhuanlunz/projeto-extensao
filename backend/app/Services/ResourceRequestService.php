<?php

namespace App\Services;

use App\Mail\ResourceRequestMail;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ResourceRequestService
{
    /**
     * Send a resource mapping request to the configured administrative email.
     */
    public function send(array $data, User $user): bool
    {
        $requestEmail = Setting::where('key', 'request_email')->value('value');

        if (!$requestEmail) {
            return false;
        }

        try {
            Mail::to($requestEmail)->send(new ResourceRequestMail($data, $user));
        } catch (Throwable) {
            return false;
        }

        return true;
    }
}
