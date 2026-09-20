<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Bu proje sıfırdan (boş) bir veritabanına deploy edildiğinde admin panel
 * (hotelReservation/backend) tarafından oluşturulmuş olması beklenen temel
 * tablo burada tanımlanır. Tek satırlık ayar tablosu — HotelSetting::current()
 * firstOrCreate ile satırı lazily oluşturur. `address`/`location` kolonları
 * bilerek burada YOK; 2026_09_03_071037 migration'ı bunları
 * `check_out_time` sonrasına ekler ve o migration'ın çalışabilmesi için bu
 * tablonun ve `check_out_time` kolonunun önceden var olması gerekir.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hotel_settings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->decimal('tax_rate', 5, 2)->default(18);
            $table->string('check_in_time', 5)->nullable();
            $table->string('check_out_time', 5)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hotel_settings');
    }
};
