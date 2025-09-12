<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billet extends Model
{
    use HasFactory;
     protected $fillable = ['qr_code','etat','nombre_de_personne','evenement_id','client_id'];
    public function evenement()
    {
        return $this->belongsTo(Evenement::class, 'evenement_id');
    }
    public function client()
    {
        return $this->belongsTo(Utilisateur::class, 'client_id');
    }
     public function payment()
    {
        return $this->hasOne(Payment::class, 'billet_id');
    }

}
