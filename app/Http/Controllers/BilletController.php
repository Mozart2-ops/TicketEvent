<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Billet;
use Illuminate\Support\Facades\Auth;


class BilletController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié'], 401);
        }

        // Récupère les billets de l'utilisateur avec les événements et tarifs
        $tickets = Billet::with(['evenement.tarif'])
            ->where('client_id', $user->id)
            ->get();

        // Retourne un tableau vide si aucun billet
        return response()->json($tickets ?? []);
    }

    public function show(Request $request, $id)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié'], 401);
        }

        $ticket = Billet::with(['evenement.tarif'])
            ->where('id', $id)
            ->where('client_id', $user->id)
            ->first();

        if (!$ticket) {
            return response()->json(['message' => 'Ticket introuvable'], 404);
        }

        return response()->json($ticket);
    }
}
