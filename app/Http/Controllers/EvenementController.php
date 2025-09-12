<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evenement;

class EvenementController extends Controller
{
    public function index()
    {
        $evenements = Evenement::with('tarif')->get();
        return response()->json($evenements);
    }
     public function show($id)
    {
        $evenement = Evenement::with(['organisateur','administrateur', 'tarif'])->find($id);

        if (!$evenement) {
            return response()->json(['message' => 'Événement introuvable'], 404);
        }

        return response()->json($evenement);
        }
}
