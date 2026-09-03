<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Mevcut admin panel tablosuna bağlanır. `identity_number` UNIQUE olduğu
 * için müşteri kayıtları updateOrCreate ile upsert edilmelidir.
 */
class Guest extends Model
{
    protected $fillable = [
        'customer_id',
        'full_name',
        'phone',
        'email',
        'identity_number',
        'country',
    ];

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
