<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Mirage Fine Dining (otel restoranı) masa rezervasyonları. Oda
 * rezervasyonlarından bağımsız, giriş yapmadan da kullanılabilen public bir
 * akış — otel misafiri olmayanlar için ücret bilgisi (mock ödeme) taşır.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('restaurant_reservations', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->unsignedTinyInteger('party_size');
            $table->date('date');
            $table->time('time');
            $table->text('note')->nullable();
            $table->boolean('is_hotel_guest')->default(false);
            $table->foreignId('reservation_id')->nullable()->constrained('reservations')->nullOnDelete();
            $table->string('payment_status')->default('paid');
            $table->decimal('amount', 8, 2)->default(0);
            $table->string('card_holder_name')->nullable();
            $table->string('card_last_four', 4)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('restaurant_reservations');
    }
};
