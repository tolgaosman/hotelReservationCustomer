<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Non-destructive: `hotel_settings` tablosu admin panelin migration'ıyla
 * zaten mevcut (tek satırlık ayar tablosu). Müşteri sitesinin ihtiyaç
 * duyduğu `address` ve `location` alanları admin şemasında yok — burada
 * eklenir. Mevcut satır bozulmaz.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hotel_settings', function (Blueprint $table) {
            if (! Schema::hasColumn('hotel_settings', 'address')) {
                $table->string('address')->nullable()->after('check_out_time');
            }
            if (! Schema::hasColumn('hotel_settings', 'location')) {
                $table->string('location')->nullable()->after('address');
            }
        });
    }

    public function down(): void
    {
        Schema::table('hotel_settings', function (Blueprint $table) {
            if (Schema::hasColumn('hotel_settings', 'location')) {
                $table->dropColumn('location');
            }
            if (Schema::hasColumn('hotel_settings', 'address')) {
                $table->dropColumn('address');
            }
        });
    }
};
