<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Billet;
use App\Models\Payment;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class PaymentController extends Controller
{
    // PaymentController.php
    public function store(Request $request)
    {
        $request->validate([
            'evenement_id' => 'required|exists:evenements,id',
            'methode' => 'required|string', // Mvola, Visa, etc.
        ]);

        $user = $request->user();
         // Vérifier si l'utilisateur a déjà payé pour cet événement
        $existingPayment = Billet::where('client_id', $user->id)
            ->where('evenement_id', $request->evenement_id)
            ->first();

        if ($existingPayment) {
            return response()->json([
                'message' => 'Vous avez déjà réservé un billet pour cet événement.'
            ], 400);
        }

        // Générer un identifiant unique pour le QR code
        $qrCode ='TKT' . strtoupper(substr(md5($user->id . time() . rand()), 0, 6));

        // Création du billet
        $billet = Billet::create([
            'qr_code' => $qrCode,
            'etat' => 'non utilisé',
            'nombre_de_personne' => 1,
            'evenement_id' => $request->evenement_id,
            'client_id' => $user->id,
        ]);

        // Création du paiement
        $payment = Payment::create([
            'billet_id' => $billet->id,
            'evenement_id' => $request->evenement_id,
            'client_id' => $user->id,
            'montant' => $billet->evenement->tarif->montant,
            'type' => $request->methode,
            'date_de_payment' => now(), // <- date actuelle // ici le type de paiement
            'statut' => 'success',
        ]);

        return response()->json(
            [
                'message' => 'Paiement réussi',
                'ticket' => $billet->load('evenement.tarif'),
            ],
            201,
        );
    }
}
