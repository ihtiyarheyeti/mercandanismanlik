<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('referanslar', function (Blueprint $table) {
            $table->id();
            $table->string('firmaAdi');
            $table->string('logo')->nullable();
            $table->text('aciklama');
            $table->string('websitesi')->nullable();
            $table->string('category_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referanslar');
    }
};
