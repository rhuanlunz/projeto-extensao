<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRoleRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    protected $userService;

    /**
     * UserController constructor.
     *
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the users.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $users = $this->userService->listAllUsers();

        return response()->json([
            'success' => true,
            'message' => 'Usuários recuperados com sucesso',
            'data' => UserResource::collection($users)
        ], 200);
    }

    /**
     * Update the role of the specified user.
     *
     * @param UpdateUserRoleRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function updateRole(UpdateUserRoleRequest $request, string $id): JsonResponse
    {
        $user = $this->userService->updateUserRole($id, $request->input('role_id'));
        $user->load('role');

        return response()->json([
            'success' => true,
            'message' => 'Role do usuário atualizada com sucesso',
            'data' => new UserResource($user)
        ], 200);
    }
}
