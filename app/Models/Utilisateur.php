<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    use HasFactory;

    protected $fillable = ['nom','prenom','telephone','statut','mdp'];

    public function organisateur()
    {
        return $this->hasMany(Evenement::class, 'organisateur_id');
    }
     public function administrateur()
    {
        return $this->hasOne(Evenement::class, 'administrateur_id');
    }
    public function client_id_for_payment()
    {
        return $this->hasOne(Payment::class, 'client_id');
    }


}
