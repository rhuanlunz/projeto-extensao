<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResourceRequestRequest;
use App\Services\ResourceRequestService;
use Illuminate\Http\JsonResponse;

class ResourceRequestController extends Controller
{
    protected $resourceRequestService;

    /**
     * ResourceRequestController constructor.
     *
     * @param ResourceRequestService $resourceRequestService
     */
    public function __construct(ResourceRequestService $resourceRequestService)
    {
        $this->resourceRequestService = $resourceRequestService;
    }

    /**
     * Send a new resource mapping request.
     *
     * @param StoreResourceRequestRequest $request
     * @return JsonResponse
     */
    public function store(StoreResourceRequestRequest $request): JsonResponse
    {
        $success = $this->resourceRequestService->send($request->validated(), $request->user());

        if (!$success) {
            return response()->json([
                'success' => false,
                'message' => 'Ocorreu uma falha no servidor.',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Requerimento enviado com sucesso.',
        ], 200);
    }
}
