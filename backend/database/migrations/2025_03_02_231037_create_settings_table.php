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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('logo')->nullable();
            $table->string('favicon')->nullable();
            $table->string('site_title')->nullable();
            $table->text('site_description')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('phone_number')->nullable();
            $table->text('address')->nullable();
            $table->string('working_hours_weekday')->nullable();
            $table->string('working_hours_saturday')->nullable();
            $table->string('working_hours_sunday')->nullable();
            $table->boolean('is_open_saturday')->default(true);
            $table->boolean('is_open_sunday')->default(false);
            $table->integer('logo_height')->default(80);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
