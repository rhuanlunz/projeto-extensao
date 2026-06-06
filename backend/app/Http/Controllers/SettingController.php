<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequestEmailRequest;
use App\Http\Requests\UpdateRequestEmailRequest;
use App\Services\SettingService;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    protected $settingService;

    /**
     * SettingController constructor.
     *
     * @param SettingService $settingService
     */
    public function __construct(SettingService $settingService)
    {
        $this->settingService = $settingService;
    }

    /**
     * Get the configured request email.
     *
     * @return JsonResponse
     */
    public function getRequestEmail(): JsonResponse
    {
        $setting = $this->settingService->getRequestEmail();

        return response()->json([
            'success' => true,
            'message' => 'E-mail de recebimento recuperado com sucesso.',
            'data' => [
                'email' => $setting?->value
            ]
        ], 200);
    }

    /**
     * Store the request email for the first time.
     *
     * @param StoreRequestEmailRequest $request
     * @return JsonResponse
     */
    public function storeRequestEmail(StoreRequestEmailRequest $request): JsonResponse
    {
        $setting = $this->settingService->setRequestEmail($request->input('email'));

        return response()->json([
            'success' => true,
            'message' => 'E-mail de recebimento configurado com sucesso.',
            'data' => [
                'email' => $setting->value
            ]
        ], 201);
    }

    /**
     * Update the configured request email.
     *
     * @param UpdateRequestEmailRequest $request
     * @return JsonResponse
     */
    public function updateRequestEmail(UpdateRequestEmailRequest $request): JsonResponse
    {
        $setting = $this->settingService->updateRequestEmail($request->input('email'));

        return response()->json([
            'success' => true,
            'message' => 'E-mail de recebimento atualizado com sucesso.',
            'data' => [
                'email' => $setting->value
            ]
        ], 200);
    }
}
