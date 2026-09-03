<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Non-destructive: `guests` tablosu admin panelin migration'larıyla zaten
 * mevcut. Siteden giriş yaparak rezervasyon yapan hesabı (`customers`) ilgili
 * misafir kaydına bağlamak için nullable bir FK eklenir. Var olan verilere
 * dokunulmaz.
 */
return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('guests', 'customer_id')) {
            Schema::table('guests', function (Blueprint $table) {
                $table->foreignId('customer_id')->nullable()->after('id')
                    ->constrained('customers')->nullOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('guests', 'customer_id')) {
            Schema::table('guests', function (Blueprint $table) {
                $table->dropConstrainedForeignId('customer_id');
            });
        }
    }
};
