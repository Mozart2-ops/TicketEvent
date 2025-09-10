<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Billet>
 */
class BilletFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'qr_code' => $this->faker->uuid(), // identifiant unique simulant un QR code
            'etat' => $this->faker->randomElement(['valide', 'utilisé', 'annulé']),
            'nombre_de_personne' => $this->faker->numberBetween(1), // nombre de personnes par billet
            'evenement_id' => \App\Models\Evenement::factory(), // lié à un evenement
            'tarif_id' => \App\Models\Tarif::factory(), // lié à un tarif
        ];
    }
}
