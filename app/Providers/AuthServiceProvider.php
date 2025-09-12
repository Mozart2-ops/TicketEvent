<?php

namespace App\Providers;
use Illuminate\Support\Facades\Auth;
use App\Models\Utilisateur;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
         $this->registerPolicies();

        Auth::viaRequest('api', function ($request) {
        // Vérifie le token dans l'en-tête Authorization
        $token = $request->bearerToken();
        if (!$token) return null;

        return Utilisateur::where('remember_token', $token)->first();
    });
    }
}
