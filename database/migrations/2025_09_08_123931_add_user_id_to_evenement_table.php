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
        Schema::table('evenements', function (Blueprint $table) {
            $table->unsignedBigInteger('organisateur_id');
            $table->foreign('organisateur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
            $table->unsignedBigInteger('administrateur_id');
            $table->foreign('administrateur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
            $table->unsignedBigInteger('tarif_id');
            $table->foreign('tarif_id')->references('id')->on('tarifs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('evenements', function (Blueprint $table) {
            $table->dropForeign(['organisateur_id']);
            $table->dropColumn('organisateur_id');
            $table->dropForeign(['administrateur_id']);
            $table->dropColumn('administrateur_id');
            $table->dropForeign(['tarif_id']);
            $table->dropColumn('tarif_id');

        });
    }
};
