<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Evenement extends Model
{
    use HasFactory;
     protected $fillable =
    [
        'titre',
        'dateEvenement',
        'heure',
        'lieu',
        'categorie',
        'description',
        'longDescription',
        'photoEvenement',
        'videoEvenement',
        'evaluation',
        'etat',
        'nombre_de_place',
        'organisateur_id',
        'administration_id',
    ];
    
     public function org()
    {
        return $this->belongsTo(Utilisateur::class, 'organisateur_id');
    }

    public function admin()
    {
        return $this->belongsTo(Utilisateur::class, 'administration_id');
    }
    public function evemement_id_for_billet()
    {
        return $this->hasOne(Billet::class, 'evenement_id');
    }
     public function evenement_id_for_payement()
    {
        return $this->hasOne(Payment::class, 'evenement_id');
    }
}

