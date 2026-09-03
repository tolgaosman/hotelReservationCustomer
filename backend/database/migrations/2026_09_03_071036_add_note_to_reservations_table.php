<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Non-destructive: `reservations` tablosu admin panelin migration'larıyla
 * zaten mevcut. Sadece müşteri rezervasyon formundaki "Özel İstekleriniz"
 * alanı için eksik olan `note` kolonu eklenir. Var olan verilere dokunulmaz.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('reservations', 'note')) {
            Schema::table('reservations', function (Blueprint $table) {
                $table->text('note')->nullable()->after('total_amount');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('reservations', 'note')) {
            Schema::table('reservations', function (Blueprint $table) {
                $table->dropColumn('note');
            });
        }
    }
};
