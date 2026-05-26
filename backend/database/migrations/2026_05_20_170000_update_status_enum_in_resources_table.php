<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // For MySQL ENUM update, we need a raw statement as Blueprint doesn't support changing ENUM values directly easily across all versions
        // Note: SQLite (used in tests) handles ENUMs as VARCHAR, but we keep raw for MySQL compatibility
        if (config('database.default') === 'mysql') {
            DB::statement("ALTER TABLE resources MODIFY COLUMN status ENUM('disponivel', 'indisponivel') DEFAULT 'disponivel'");
        } else {
            // Fallback for tests or other DBs
            Schema::table('resources', function (Blueprint $table) {
                $table->string('status')->default('disponivel')->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (config('database.default') === 'mysql') {
            DB::statement("ALTER TABLE resources MODIFY COLUMN status ENUM('disponível', 'indisponível') DEFAULT 'disponível'");
        } else {
            Schema::table('resources', function (Blueprint $table) {
                $table->string('status')->default('disponível')->change();
            });
        }
    }
};
