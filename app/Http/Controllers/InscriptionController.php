<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use App\Models\Utilisateur;

class InscriptionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'telephone' => 'required|string|unique:users,telephone',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = Utilisateur::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'telephone' => $validated['telephone'],
            'statut' => null, // client par défaut
            'mdp' => Hash::make($validated['password']),
        ]);

        // Connexion automatique après inscription
        auth()->login($user);

        return redirect()->route('/home'); // redirige vers un dashboard ou accueil
    }
}
