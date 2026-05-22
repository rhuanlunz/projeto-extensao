<?php

namespace Database\Factories;

use App\Models\Resource;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Resource>
 */
class ResourceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'unesc_id' => $this->faker->unique()->numerify('UNESC-####'),
            'status' => $this->faker->randomElement(['disponivel', 'indisponivel']),
            'category_id' => \App\Models\Category::factory(),
            'level_id' => \App\Models\Level::factory(),
        ];
    }
}
