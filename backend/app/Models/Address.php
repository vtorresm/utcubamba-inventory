<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'health_center',
        'phone',
        'street_address',
        'district',
        'city',
        'department',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function getFullHealthAttribute()
    {
        return "{$this->health_center}";
    }
}
