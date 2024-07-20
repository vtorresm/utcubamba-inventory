<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'email',
        'address',
        'phone',
        'district',
        'is_active',
    ];


    public function getFullCompanyAttribute()
    {
        return "{$this->company_name}";
    }

    public function getFullAddressAttribute()
    {
        return "{$this->address}";
    }
}
