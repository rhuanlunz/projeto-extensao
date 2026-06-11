<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResourceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'unesc_id' => $this->unesc_id,
            'description' => $this->description,
            'status' => $this->status,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'level' => new LevelResource($this->whenLoaded('level')),
        ];
    }
}
