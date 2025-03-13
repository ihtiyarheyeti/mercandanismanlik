<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('ready_sites', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->json('features');
            $table->decimal('price', 10, 2);
            $table->string('image')->nullable();
            $table->string('demo_link')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ready_sites');
    }
}; 