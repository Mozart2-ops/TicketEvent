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
        Schema::table('payments', function (Blueprint $table) {
            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')->references('id')->on('utilisateurs')->onDelete('cascade');
            $table->unsignedBigInteger('evenement_id');
            $table->foreign('evenement_id')->references('id')->on('evenements')->onDelete('cascade');
            $table->unsignedBigInteger('billet_id');
            $table->foreign('billet_id')->references('id')->on('billets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign(['client_id']);
            $table->dropColumn('client_id');
            $table->dropForeign(['evenement_id']);
            $table->dropColumn('evenement_id');
            $table->dropForeign(['billet_id']);
            $table->dropColumn('billet_id');
        });
    }
};
