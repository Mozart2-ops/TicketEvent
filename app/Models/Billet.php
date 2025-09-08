<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billet extends Model
{
    use HasFactory;
     protected $fillable = ['tarif','type','qr_code','etat','evenement_id','tarif_id'];
    public function IDevenement()
    {
        return $this->belongsTo(Evenement::class, 'evenement_id');
    }
    public function IDtarif()
    {
        return $this->belongsTo(Tarif::class, 'tarif_id');
    }
     public function billet_id_for_payment()
    {
        return $this->hasOne(Payment::class, 'billet_id');
    }
    
}
