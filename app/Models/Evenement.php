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
        return $this->belongsTo(Utilisateur::class,'organisateur_id');
    }

    public function administrateur()
    {
        return $this->belongsTo(Utilisateur::class,'administrateur_id');
    }
     public function tarif()
    {
        return $this->belongsTo(Tarif::class);
    }
    public function billets()
    {
        return $this->hasMany(Billet::class, 'evenement_id');
    }
     public function payments()
    {
        return $this->hasMany(Payment::class, 'evenement_id');
    }
}

