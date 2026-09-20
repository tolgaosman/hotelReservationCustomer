<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Sıfır (boş) bir veritabanına `migrate --seed` ile deploy edildiğinde
     * sitenin tam fonksiyonel olması için gereken sırada çalışır:
     * 1) RoomTypeContentSeeder — oda tipi pazarlama içeriği + hotel_settings
     *    satırını (HotelSetting::current()) oluşturur.
     * 2) RoomSeeder — fiziksel odalar (rooms.type, RoomTypeContentSeeder'daki
     *    5 tiple eşleşmeli).
     * 3) ReviewSeeder — en az bir oda gerektirir (Room::first()), bu yüzden
     *    RoomSeeder'dan sonra çalışır.
     * 4) AddonSeeder — bağımsız, ekstra hizmetler.
     */
    public function run(): void
    {
        $this->call([
            RoomTypeContentSeeder::class,
            RoomSeeder::class,
            ReviewSeeder::class,
            AddonSeeder::class,
        ]);
    }
}
