<?php

use App\Enums\RoomStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Bu proje sıfırdan (boş) bir veritabanına deploy edildiğinde admin panel
 * tarafından oluşturulmuş olması beklenen temel tablo burada tanımlanır.
 * bkz. App\Models\Room $fillable/$casts ve App\Enums\RoomStatus. `status`
 * admin panelle paylaşılan bir enum'u temsil eder ama burada MySQL native
 * enum yerine düz `string` kullanılır (uygulama seviyesinde PHP enum cast'i
 * ile doğrulanıyor).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('number')->unique();
            $table->string('type', 50); // room_type_contents.type ile eşleşir
            $table->unsignedTinyInteger('capacity')->default(2);
            $table->decimal('nightly_rate', 10, 2)->default(0);
            $table->json('amenities')->nullable();
            $table->string('status', 20)->default(RoomStatus::Available->value);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
