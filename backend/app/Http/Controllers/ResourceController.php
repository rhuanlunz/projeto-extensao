<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\ResourceService;
use Illuminate\Http\JsonResponse;

use App\Http\Requests\StoreResourceRequest;
use App\Http\Requests\UpdateResourceRequest;

class ResourceController extends Controller
{
    protected $resourceService;

    public function __construct(ResourceService $resourceService)
    {
        $this->resourceService = $resourceService;
    }

    /**
     * Display a listing of the resources.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $resources = $this->resourceService->listAll();

        return response()->json([
            'success' => true,
            'message' => 'Resources retrieved successfully',
            'data' => $resources
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreResourceRequest $request
     * @return JsonResponse
     */
    public function store(StoreResourceRequest $request): JsonResponse
    {
        $resource = $this->resourceService->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Resource created successfully',
            'data' => $resource
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateResourceRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(UpdateResourceRequest $request, string $id): JsonResponse
    {
        $resource = $this->resourceService->update($id, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Resource updated successfully',
            'data' => $resource
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $this->resourceService->delete($id);

        return response()->json(null, 204);
    }
}
