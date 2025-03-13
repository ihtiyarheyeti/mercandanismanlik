<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->string('working_hours_weekday')->nullable();
            $table->string('working_hours_saturday')->nullable();
            $table->string('working_hours_sunday')->nullable();
            $table->boolean('is_open_saturday')->default(true);
            $table->boolean('is_open_sunday')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->dropColumn([
                'working_hours_weekday',
                'working_hours_saturday',
                'working_hours_sunday',
                'is_open_saturday',
                'is_open_sunday'
            ]);
        });
    }
}; 