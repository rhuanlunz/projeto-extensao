<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\ResourceService;
use Illuminate\Http\JsonResponse;

use App\Http\Requests\StoreResourceRequest;
use App\Http\Requests\UpdateResourceRequest;
use App\Http\Resources\ResourceResource;

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
        $resourcesGrouped = $this->resourceService->listAll();

        $formattedData = [];
        foreach ($resourcesGrouped as $levelName => $resources) {
            $formattedData[$levelName] = ResourceResource::collection($resources);
        }

        return response()->json([
            'success' => true,
            'message' => 'Resources retrieved successfully',
            'data' => $formattedData
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
        $resource->load(['level', 'category']);

        return response()->json([
            'success' => true,
            'message' => 'Resource created successfully',
            'data' => new ResourceResource($resource)
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
        $resource->load(['level', 'category']);

        return response()->json([
            'success' => true,
            'message' => 'Resource updated successfully',
            'data' => new ResourceResource($resource)
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

        return response()->json([
            'success' => true,
            'message' => 'Resource deleted successfully'
        ], 200);
    }
}
