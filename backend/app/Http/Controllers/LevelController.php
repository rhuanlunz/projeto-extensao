<?php

namespace App\Http\Controllers;

use App\Http\Resources\LevelResource;
use App\Services\LevelService;
use Illuminate\Http\JsonResponse;

class LevelController extends Controller
{
    protected $levelService;

    /**
     * LevelController constructor.
     *
     * @param LevelService $levelService
     */
    public function __construct(LevelService $levelService)
    {
        $this->levelService = $levelService;
    }

    /**
     * Display a listing of the levels.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $levels = $this->levelService->getAllLevels();

        return response()->json([
            'success' => true,
            'message' => 'Andares recuperados com sucesso.',
            'data' => LevelResource::collection($levels)
        ], 200);
    }
}
