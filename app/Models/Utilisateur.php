<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Utilisateur extends Model
{
    use HasApiTokens, Notifiable; // note pour le token necéssaire
    protected $table = 'utilisateurs';
    protected $fillable = ['nom','prenom','telephone','statut','mdp'];

    protected $hidden = ['mdp']; //note pour le token necéssaire
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
