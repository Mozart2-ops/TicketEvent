<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use \App\Models\Utilisateur;
use \App\Models\Tarif;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Evenement>
 */
class EvenementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titre' => $this->faker->sentence(3),
            'dateEvenement' => $this->faker->dateTimeBetween('+1 week', '+6 months')->format('Y-m-d'),
            'heure' => $this->faker->time('H:i'),
            'lieu' => $this->faker->city(),
            'categorie' => $this->faker->randomElement(['Concert', 'Conférence', 'Sport', 'Festival']),
            'description' => $this->faker->text(100),
            'longDescription' => $this->faker->paragraph(5),
            'photoEvenement' => $this->faker->imageUrl(640, 480, 'event', true, 'Faker'),
            'videoEvenement' => $this->faker->optional()->url(),
            'evaluation' => $this->faker->randomFloat(1, 0, 5), // ex: note sur 5
            'etat' => $this->faker->randomElement(['actif', 'annulé', 'reporté']),
            'nombre_de_place' => $this->faker->numberBetween(50, 1000),
            'organisateur_id' => Utilisateur::factory(), // lié à un user organisateur
            'administrateur_id' => Utilisateur::factory(), // lié à un admin
            'tarif_id' => Tarif::factory(), // lié à un tarif
        ];
    }
}
