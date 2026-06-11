<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    /**
     * List all users with their roles.
     *
     * @return Collection
     */
    public function listAllUsers(): Collection
    {
        return User::with('role')->get();
    }

    /**
     * Update the role of a user.
     *
     * @param string $userId
     * @param int $roleId
     * @return User
     */
    public function updateUserRole(string $userId, int $roleId): User
    {
        $user = User::findOrFail($userId);
        $user->role_id = $roleId;
        $user->save();

        return $user;
    }
}
