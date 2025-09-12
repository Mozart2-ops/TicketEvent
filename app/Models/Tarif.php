<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarif extends Model
{
    use HasFactory;

     protected $fillable = ['montant','type'];

    public function tarif()
    {
        return $this->hasMany(Evenement::class, 'tarif_id');
    }
}
