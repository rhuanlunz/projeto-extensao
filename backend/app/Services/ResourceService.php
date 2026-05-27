<?php

namespace App\Services;

use App\Models\Resource;

class ResourceService
{
    /**
     * List all resources grouped by level name.
     *
     * @return array
     */
    public function listAll()
    {
        $levels = \App\Models\Level::all();
        $grouped = [];

        foreach ($levels as $level) {
            $grouped[$level->name] = [];
        }

        $resources = Resource::with(['level', 'category'])->get();

        foreach ($resources as $resource) {
            $grouped[$resource->level->name][] = $resource;
        }

        return $grouped;
    }

    /**
     * Create a new resource.
     *
     * @param array $data
     * @return Resource
     */
    public function create(array $data)
    {
        return Resource::create($data);
    }

    /**
     * Update an existing resource.
     *
     * @param int|string $id
     * @param array $data
     * @return Resource
     */
    public function update($id, array $data)
    {
        $resource = Resource::findOrFail($id);
        $resource->update($data);

        return $resource;
    }

    /**
     * Update only the status of an existing resource.
     *
     * @param int|string $id
     * @param array $data
     * @return Resource
     */
    public function updateStatus($id, array $data)
    {
        $resource = Resource::findOrFail($id);
        $resource->update(['status' => $data['status']]);

        return $resource;
    }

    /**
     * Delete an existing resource (Soft Delete).
     *
     * @param int|string $id
     * @return bool|null
     */
    public function delete($id)
    {
        $resource = Resource::findOrFail($id);
        return $resource->delete();
    }
}
