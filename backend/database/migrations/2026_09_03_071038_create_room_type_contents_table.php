<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Yeni tablo — mevcut `rooms` tablosuna hiç dokunmaz. Admin paneldeki
 * `rooms.type` (Standart/Deluxe/Aile Odası/Suite/King Suite) 5 farklı
 * tip için 12'şer oda içeriyor; müşteri sitesindeki pazarlama içeriği
 * (slug/title/description/size/rating/reviewCount/images) oda başına
 * değil, tip başına tek satır olarak burada tutulur.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('room_type_contents')) {
            Schema::create('room_type_contents', function (Blueprint $table) {
                $table->id();
                $table->string('type', 50)->unique(); // rooms.type ile eşleşir (ör. 'Standart')
                $table->string('slug', 80)->unique(); // ör. 'standart'
                $table->string('title');
                $table->text('description')->nullable();
                $table->unsignedSmallInteger('size')->default(0); // m²
                $table->decimal('rating', 2, 1)->default(0);
                $table->unsignedInteger('review_count')->default(0);
                $table->json('images')->nullable();
                $table->unsignedSmallInteger('sort_order')->default(0);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('room_type_contents');
    }
};
