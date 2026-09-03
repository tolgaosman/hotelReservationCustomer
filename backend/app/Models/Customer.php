<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Site müşterisi. Admin panelin çalışan/employee hesaplarını tuttuğu
 * `users` tablosuyla hiçbir ilişkisi yoktur — bkz. customers migration'ı.
 */
class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'identity_number',
        'google_id',
        'password',
    ];

    protected $hidden = [
        'password',
        'api_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function guests(): HasMany
    {
        return $this->hasMany(Guest::class);
    }
}
