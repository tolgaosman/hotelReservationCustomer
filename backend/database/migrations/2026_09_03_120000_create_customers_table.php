<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Müşteri hesapları admin panelin `users` tablosundan tamamen ayrı
     * tutulur (aynı MySQL'i paylaşsalar bile) — bkz. .env.example. Admin
     * panel giriş bilgileri bu tabloda karşılık bulamaz ve burada asla
     * geçerli olamaz.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('identity_number')->nullable();
            $table->string('password');
            $table->string('api_token', 64)->nullable()->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
