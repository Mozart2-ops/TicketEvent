<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Utilisateur extends Authenticatable
{
   use Notifiable;
    protected $table = 'utilisateurs';
    protected $fillable = ['nom','prenom','telephone','statut','mdp'];

    protected $hidden = [
        'mdp',
        'remember_token',
    ];
     protected $casts = [
        'mdp' => 'hashed',
    ];
       public function getAuthPassword()
    {
        return $this->mdp;
    }

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
