<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "payment_id" => Str::random(8),
            "username" => $this->faker->userName(),
            "name" => $this->faker->name(),
            "email" => $this->faker->unique()->safeEmail(),
            "email_verified_at" => now(),
            "password" => Hash::make("Password"),
            "address" => $this->faker->address(),
            "phone_number" => $this->faker->phoneNumber(),
            "subscription_type_id" => rand(1,3),
            "remember_token" => Str::random(10)
        ];
    }
}
