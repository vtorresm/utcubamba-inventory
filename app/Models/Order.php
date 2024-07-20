<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bill_no',
        'customer_name',
        'customer_address',
        'customer_phone',
        'date_time',
        'gross_amount',
        'currency',
        'grand_total',
        'service_charge_rate',
        'service_charge',
        'igv_charge_rate',
        'igv_charge',
        'net_amount',
        'discount_rate',
        'paid_status',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function address() {
        return $this->hasOne(Address::class);
    }
}
