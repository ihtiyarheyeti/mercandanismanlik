<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->text('excerpt');
            $table->string('author_name');
            $table->foreignId('category_id')->constrained('blog_categories')->onDelete('cascade');
            $table->string('featured_image')->nullable();
            $table->json('tags')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
}; 