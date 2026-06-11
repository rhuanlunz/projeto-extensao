<?php

namespace App\Services;

use App\Models\Level;
use Illuminate\Database\Eloquent\Collection;

class LevelService
{
    /**
     * Retorna todos os andares (levels) cadastrados.
     *
     * @return Collection
     */
    public function getAllLevels(): Collection
    {
        return Level::orderBy('id')->get();
    }
}
