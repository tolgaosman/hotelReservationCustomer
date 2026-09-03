<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Bu proje mevcut hotel_reservation veritabanına bağlanır — users
     * tablosu admin panele ait, buradan hiçbir kullanıcı yaratılmaz.
     * Sadece bu API'nin eklediği içerik seed edilir.
     */
    public function run(): void
    {
        $this->call([
            RoomTypeContentSeeder::class,
        ]);
    }
}
