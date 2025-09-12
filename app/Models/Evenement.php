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
        'tarif_id'
    ];

     public function organisateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }

    public function administrateur()
    {
        return $this->belongsTo(Utilisateur::class);
    }
     public function tarif()
    {
        return $this->belongsTo(Tarif::class);
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

