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
        Schema::table('billets', function (Blueprint $table) {
            $table->unsignedBigInteger('evenement_id');
            $table->foreign('evenement_id')->references('id')->on('evenements')->onDelete('cascade');
            $table->unsignedBigInteger('tarif_id');
            $table->foreign('tarif_id')->references('id')->on('tarifs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('billets', function (Blueprint $table) {
            $table->dropForeign(['evenement_id']);
            $table->dropColumn('evenement_id');
            $table->dropForeign(['tarif_id']);
            $table->dropColumn('tarif_id');
        });
    }
};
