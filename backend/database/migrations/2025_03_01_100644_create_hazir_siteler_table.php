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
        Schema::create('hazir_siteler', function (Blueprint $table) {
            $table->id();
            $table->string('ad');
            $table->text('aciklama');
            $table->decimal('fiyat', 10, 2);
            $table->string('gorsel')->nullable();
            $table->string('category_name')->nullable();
            $table->json('ozellikler')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hazir_siteler');
    }
};
