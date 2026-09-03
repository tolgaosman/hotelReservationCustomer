<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Mevcut admin panel tablosuna bağlanır (tek satırlık ayar tablosu).
 * `address`/`location` bu proje tarafından eklenmiştir (bkz.
 * 2026_09_03_071037 migration). `current()` admin'deki
 * HotelSetting::current() ile aynı desen — id=1 varsayımı yapılmaz.
 */
class HotelSetting extends Model
{
    protected $table = 'hotel_settings';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'tax_rate',
        'check_in_time',
        'check_out_time',
        'address',
        'location',
    ];

    protected $casts = [
        'tax_rate' => 'decimal:2',
    ];

    public static function current(): self
    {
        return static::query()->firstOrCreate([], [
            'name' => 'Oasis Resort',
            'email' => 'info@oasisresort.com',
            'phone' => '+90 212 555 10 00',
            'tax_rate' => 18,
            'check_in_time' => '14:00',
            'check_out_time' => '12:00',
        ]);
    }
}
