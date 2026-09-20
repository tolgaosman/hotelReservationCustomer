<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Bu proje sıfırdan (boş) bir veritabanına deploy edildiğinde admin panel
 * tarafından oluşturulmuş olması beklenen temel tablo burada tanımlanır.
 * bkz. App\Models\Guest $fillable. `customer_id` kasıtlı olarak burada YOK
 * — 2026_09_03_130000_add_customer_id_to_guests_table migration'ı bunu
 * `id` sonrasına ekler (bu migration'ın `after('id')` çağırabilmesi için
 * bu tablonun önceden var olması yeterlidir). `identity_number` Guest
 * modelindeki yorumda belirtildiği gibi unique tutulur (ReservationController
 * bununla updateOrCreate yapıyor).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guests', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('identity_number')->nullable()->unique();
            $table->string('country')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guests');
    }
};
