<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => $this->faker->randomElement(['carte_visa', 'airtel', 'telma', 'orange']),
            'date_de_payment' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'client_id' => \App\Models\Utilisateur::factory(), // lié à un user client
            'billet_id' => \App\Models\Billet::factory(), // lié à un billet
        ];
    }
}
