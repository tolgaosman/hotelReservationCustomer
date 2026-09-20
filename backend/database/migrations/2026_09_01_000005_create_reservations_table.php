<?php

use App\Enums\ReservationStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Bu proje sıfırdan (boş) bir veritabanına deploy edildiğinde admin panel
 * tarafından oluşturulmuş olması beklenen temel tablo burada tanımlanır.
 * bkz. App\Models\Reservation $fillable/$casts ve App\Enums\ReservationStatus.
 * `note` kasıtlı olarak burada YOK — 2026_09_03_071036 migration'ı bunu
 * `total_amount` sonrasına ekler (bu migration'ın `after('total_amount')`
 * çağırabilmesi için `total_amount` kolonunun burada gerçek bir kolon
 * olarak var olması gerekir). `check_out > check_in` Reservation model
 * yorumunda belirtildiği gibi DB seviyesinde CHECK constraint ile de
 * zorlanır.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guest_id')->constrained()->cascadeOnDelete();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();
            $table->date('check_in');
            $table->date('check_out');
            $table->unsignedTinyInteger('guest_count')->default(1);
            $table->string('status', 20)->default(ReservationStatus::Pending->value);
            $table->decimal('total_amount', 10, 2)->default(0);
            $table->string('created_by')->nullable();
            $table->timestamps();
        });

        DB::statement('ALTER TABLE reservations ADD CONSTRAINT chk_reservations_dates CHECK (check_out > check_in)');
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
