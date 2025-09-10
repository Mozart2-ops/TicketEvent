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
        Schema::create('evenements', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->date('dateEvenement');
            $table->time('heure');
            $table->string('lieu');
            $table->string('categorie');
            $table->string('description');
            $table->text('longDescription');
            $table->string('photoEvenement')->nullable();
            $table->string('videoEvenement')->nullable();
            $table->string('evaluation');
            $table->integer('nombre_de_place');
            $table->string('etat');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evenements');
    }
};
