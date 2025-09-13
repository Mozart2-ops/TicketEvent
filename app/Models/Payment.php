<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

     protected $fillable =
     [
        'type',
        'date_de_payment',
        'billet_id'
    ];
    public function billet()
    {
        return $this->belongsTo(Billet::class, 'billet_id');
    }
}
