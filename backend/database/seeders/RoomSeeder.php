<?php

namespace Database\Seeders;

use App\Enums\RoomStatus;
use App\Models\Room;
use Illuminate\Database\Seeder;

/**
 * Idempotent: `updateOrCreate(['number' => ...])` ile çalışır, birden fazla
 * kez çalıştırılabilir. `type` alanları RoomTypeContentSeeder'daki 5 tiple
 * birebir eşleşmelidir ('Standart','Deluxe','Aile Odası','Suite','King
 * Suite') — RoomController/SearchController bu değerle room_type_contents'e
 * join eder (Room::typeContent()).
 */
class RoomSeeder extends Seeder
{
    public function run(): void
    {
        $rooms = [
            // Standart — 1. kat, 2 kişilik, giriş seviyesi
            ['number' => '101', 'type' => 'Standart', 'capacity' => 2, 'nightly_rate' => 2200, 'amenities' => ['Klima', 'Wi-Fi', 'LED TV', 'Duş']],
            ['number' => '102', 'type' => 'Standart', 'capacity' => 2, 'nightly_rate' => 2200, 'amenities' => ['Klima', 'Wi-Fi', 'LED TV', 'Duş']],
            ['number' => '103', 'type' => 'Standart', 'capacity' => 2, 'nightly_rate' => 2250, 'amenities' => ['Klima', 'Wi-Fi', 'LED TV', 'Duş', 'Çalışma Masası']],
            ['number' => '104', 'type' => 'Standart', 'capacity' => 2, 'nightly_rate' => 2200, 'amenities' => ['Klima', 'Wi-Fi', 'LED TV', 'Duş']],
            ['number' => '105', 'type' => 'Standart', 'capacity' => 3, 'nightly_rate' => 2400, 'amenities' => ['Klima', 'Wi-Fi', 'LED TV', 'Duş', 'Ekstra Yatak']],
            ['number' => '106', 'type' => 'Standart', 'capacity' => 2, 'nightly_rate' => 2200, 'amenities' => ['Klima', 'Wi-Fi', 'LED TV', 'Duş']],

            // Deluxe — 2. kat, balkonlu, deniz manzaralı
            ['number' => '201', 'type' => 'Deluxe', 'capacity' => 2, 'nightly_rate' => 3400, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Balkon', 'Deniz Manzarası']],
            ['number' => '202', 'type' => 'Deluxe', 'capacity' => 2, 'nightly_rate' => 3400, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Balkon', 'Deniz Manzarası']],
            ['number' => '203', 'type' => 'Deluxe', 'capacity' => 3, 'nightly_rate' => 3600, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Balkon', 'Deniz Manzarası', 'Kahve Makinesi']],
            ['number' => '204', 'type' => 'Deluxe', 'capacity' => 2, 'nightly_rate' => 3400, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Balkon', 'Deniz Manzarası']],
            ['number' => '205', 'type' => 'Deluxe', 'capacity' => 2, 'nightly_rate' => 3500, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Balkon', 'Şehir Manzarası']],
            ['number' => '206', 'type' => 'Deluxe', 'capacity' => 3, 'nightly_rate' => 3600, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Balkon', 'Deniz Manzarası']],

            // Aile Odası — 3. kat, iki ayrı yatak alanı, geniş
            ['number' => '301', 'type' => 'Aile Odası', 'capacity' => 4, 'nightly_rate' => 4200, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'İki Yatak Odası', 'Oturma Alanı']],
            ['number' => '302', 'type' => 'Aile Odası', 'capacity' => 4, 'nightly_rate' => 4200, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'İki Yatak Odası', 'Oturma Alanı']],
            ['number' => '303', 'type' => 'Aile Odası', 'capacity' => 5, 'nightly_rate' => 4500, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'İki Yatak Odası', 'Oturma Alanı', 'Ekstra Yatak']],
            ['number' => '304', 'type' => 'Aile Odası', 'capacity' => 4, 'nightly_rate' => 4200, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'İki Yatak Odası', 'Bebek Karyolası']],
            ['number' => '305', 'type' => 'Aile Odası', 'capacity' => 4, 'nightly_rate' => 4300, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'İki Yatak Odası', 'Deniz Manzarası']],

            // Suite — 4. kat, ayrı oturma alanı, jakuzi, panoramik manzara
            ['number' => '401', 'type' => 'Suite', 'capacity' => 3, 'nightly_rate' => 6500, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Jakuzi', 'Ayrı Oturma Alanı', 'Panoramik Deniz Manzarası']],
            ['number' => '402', 'type' => 'Suite', 'capacity' => 3, 'nightly_rate' => 6500, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Jakuzi', 'Ayrı Oturma Alanı', 'Panoramik Deniz Manzarası']],
            ['number' => '403', 'type' => 'Suite', 'capacity' => 4, 'nightly_rate' => 6900, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Jakuzi', 'Ayrı Oturma Alanı', 'Nespresso Makinesi']],
            ['number' => '404', 'type' => 'Suite', 'capacity' => 3, 'nightly_rate' => 6600, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Jakuzi', 'Ayrı Oturma Alanı', 'Panoramik Deniz Manzarası']],
            ['number' => '405', 'type' => 'Suite', 'capacity' => 3, 'nightly_rate' => 6500, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Jakuzi', 'Ayrı Oturma Alanı']],

            // King Suite — 5. kat, otelin en geniş odası, özel teras
            ['number' => '501', 'type' => 'King Suite', 'capacity' => 4, 'nightly_rate' => 9500, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Özel Jakuzili Teras', 'Geniş Salon', 'Panoramik Deniz Manzarası', 'Kişiye Özel Concierge']],
            ['number' => '502', 'type' => 'King Suite', 'capacity' => 4, 'nightly_rate' => 9500, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Özel Jakuzili Teras', 'Geniş Salon', 'Panoramik Deniz Manzarası', 'Kişiye Özel Concierge']],
            ['number' => '503', 'type' => 'King Suite', 'capacity' => 5, 'nightly_rate' => 9900, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Özel Jakuzili Teras', 'Geniş Salon', 'Panoramik Deniz Manzarası', 'Özel Şef Hizmeti']],
            ['number' => '504', 'type' => 'King Suite', 'capacity' => 4, 'nightly_rate' => 9500, 'amenities' => ['Klima', 'Wi-Fi', 'Mini Bar', 'Özel Jakuzili Teras', 'Geniş Salon', 'Panoramik Deniz Manzarası']],
        ];

        foreach ($rooms as $data) {
            Room::query()->updateOrCreate(
                ['number' => $data['number']],
                $data + ['status' => RoomStatus::Available->value],
            );
        }
    }
}
