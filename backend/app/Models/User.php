<?php

namespace App\Models;

use App\Notifications\CustomResetPasswordNotification;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Http\Enums\Roles;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password'])]
class User extends Authenticatable implements JWTSubject, CanResetPassword
{
    use Notifiable, HasFactory, HasUuids;

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    /**
     * Relacionamento com a role do usuário.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Verifica se o usuário possui a role especificada.
     */
    public function hasRole(Roles|string $role): bool
    {
        if ($role instanceof Roles) {
            return (int) $this->role_id === $role->value;
        }

        $enumName = strtoupper($role);

        foreach (Roles::cases() as $case) {
            if ($case->name === $enumName) {
                return (int) $this->role_id === $case->value;
            }
        }

        return false;
    }

    /**
     * Verifica se o usuário possui alguma das roles especificadas.
     *
     * @param array<Roles|string> $roles
     */
    public function hasAnyRole(array $roles): bool
    {
        foreach ($roles as $role) {
            if ($this->hasRole($role)) {
                return true;
            }
        }

        return false;
    }

    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [
            'aud' => config('JWT_AUDIENCE', 'resource-api'),
        ];
    }

    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new CustomResetPasswordNotification($token));
    }
}
