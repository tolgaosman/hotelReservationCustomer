<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Bu proje sıfırdan (boş) bir veritabanına deploy edildiğinde admin panel
 * tarafından oluşturulmuş olması beklenen temel tablo burada tanımlanır.
 * Model yok — App\Http\Controllers\Api\ReservationController bu tabloya
 * doğrudan DB::table('addon_reservation') ile yazıyor/okuyor
 * (reservation_id, addon_id, price_at_booking, created_at, updated_at).
 * `addons` ve `reservations` tablolarından sonra çalışmalıdır.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('addon_reservation', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('addon_id')->constrained()->cascadeOnDelete();
            $table->decimal('price_at_booking', 8, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('addon_reservation');
    }
};
