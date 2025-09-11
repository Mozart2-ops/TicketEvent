<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str; // pour générer le token

class InscriptionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'telephone' => 'required|string|min:10|unique:utilisateurs,telephone',
            'mdp' => 'required|string|min:6|confirmed',
        ]);

        $user = Utilisateur::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'telephone' => $validated['telephone'],
            'mdp' => Hash::make($validated['mdp']),
        ]);

        // Générer un token aléatoire
        $token = Str::random(60);

        // Stocker le token dans le champ remember_token
        $user->remember_token = $token;
        $user->save();

        return response()->json([
            'message' => 'Inscription réussie',
            'user' => $user,
            'token' => $token
        ], 201);
    }

     // Login
      public function login(Request $request)
    {
        $request->validate([
            'telephone' => 'required|string',
            'mdp' => 'required|string|min:6',
        ]);

        $telephone = preg_replace('/\D/', '', $request->telephone);

        $user = Utilisateur::where('telephone', $telephone)->first();

        if (!$user || !Hash::check($request->mdp, $user->mdp)) {
            return response()->json([
                'message' => 'Numéro de téléphone ou mot de passe incorrect'
            ], 401);
        }

        // Retourner le token stocké dans remember_token
        $token = $user->remember_token;

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => [
                'id' => $user->id,
                'nom' => $user->nom,
                'prenom' => $user->prenom,
                'telephone' => $user->telephone,
                'statut' => $user->statut,
            ],
            'token' => $token
        ]);
    }


}
