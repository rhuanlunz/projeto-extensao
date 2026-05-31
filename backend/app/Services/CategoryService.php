<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Validation\ValidationException;

class CategoryService
{
    /**
     * List all categories.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function listAll()
    {
        return Category::all();
    }

    /**
     * Create a new category.
     *
     * @param array $data
     * @return Category
     */
    public function create(array $data)
    {
        return Category::create($data);
    }

    /**
     * Update an existing category.
     *
     * @param int|string $id
     * @param array $data
     * @return Category
     */
    public function update($id, array $data)
    {
        $category = Category::findOrFail($id);
        $category->update($data);

        return $category;
    }

    /**
     * Delete an existing category.
     *
     * @param int|string $id
     * @return bool|null
     * @throws ValidationException
     */
    public function delete($id)
    {
        $category = Category::findOrFail($id);
        
        if ($category->resources()->exists()) {
            throw ValidationException::withMessages([
                'category' => 'Não é possível excluir uma categoria que possui recursos vinculados.'
            ]);
        }

        return $category->delete();
    }
}
