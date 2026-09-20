<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Bu proje sıfırdan (boş) bir veritabanına deploy edildiğinde admin panel
 * tarafından oluşturulmuş olması beklenen temel tablo burada tanımlanır.
 * bkz. App\Models\Review $fillable/$casts. `reservation_id` kasıtlı olarak
 * burada YOK — 2026_09_04_120000_add_reservation_id_to_reviews_table
 * migration'ı bunu `room_id` sonrasına ekler (bu migration'ın
 * `after('room_id')` çağırabilmesi için `room_id` kolonunun burada var
 * olması yeterlidir).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();
            $table->string('guest_name');
            $table->unsignedTinyInteger('rating')->default(5);
            $table->text('comment')->nullable();
            $table->boolean('is_approved')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
