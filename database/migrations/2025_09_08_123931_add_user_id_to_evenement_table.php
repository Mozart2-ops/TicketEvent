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
            $table->unsignedBigInteger('organisteur_id');
            $table->foreign('organisteur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
            $table->unsignedBigInteger('administrateur_id');
            $table->foreign('administrateur_id')->references('id')->on('utilisateurs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('evenements', function (Blueprint $table) {
            $table->dropForeign(['organisteur_id']);
            $table->dropColumn('organisteur_id');
            $table->dropForeign(['administrateur_id']);
            $table->dropColumn('administrateur_id');
        });
    }
};
