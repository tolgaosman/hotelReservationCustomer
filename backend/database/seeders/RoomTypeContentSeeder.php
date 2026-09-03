<?php

namespace Database\Seeders;

use App\Models\HotelSetting;
use App\Models\RoomTypeContent;
use Illuminate\Database\Seeder;

/**
 * Idempotent: `updateOrCreate(['type' => ...])` ile çalışır, birden fazla
 * kez çalıştırılabilir. İçerik frontend'in mock verisinden
 * (frontend/src/lib/mock-data.ts) alınmıştır — böylece backend'e
 * geçildiğinde görünen metin/görseller aynı kalır.
 */
class RoomTypeContentSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            [
                'type' => 'Standart',
                'slug' => 'standart',
                'title' => 'Standart Oda',
                'description' => 'Kompakt ve konforlu, kısa konaklamalar için ideal. Şehir manzaralı, günlük ihtiyaçlarınızı karşılayan sade bir oda.',
                'size' => 24,
                'rating' => 4.6,
                'review_count' => 42,
                'sort_order' => 1,
                'images' => [
                    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2400',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2400',
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2400',
                    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2400',
                ],
            ],
            [
                'type' => 'Deluxe',
                'slug' => 'deluxe',
                'title' => 'Deluxe Oda',
                'description' => 'Geniş balkonu ve deniz manzarasıyla öne çıkan, çiftler ve küçük aileler için tasarlanmış ferah bir oda.',
                'size' => 32,
                'rating' => 4.8,
                'review_count' => 86,
                'sort_order' => 2,
                'images' => [
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2400',
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2400',
                    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2400',
                    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2400',
                ],
            ],
            [
                'type' => 'Aile Odası',
                'slug' => 'aile-odasi',
                'title' => 'Aile Odası',
                'description' => 'İki ayrı yatak alanı ile ailelere özel konfor. Geniş oturma köşesi ve depolama alanı içerir.',
                'size' => 42,
                'rating' => 4.7,
                'review_count' => 112,
                'sort_order' => 3,
                'images' => [
                    'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2400',
                    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=2400',
                    'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2400',
                    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2400',
                ],
            ],
            [
                'type' => 'Suite',
                'slug' => 'suite',
                'title' => 'Suite Oda',
                'description' => 'Ayrı oturma alanı, jakuzi ve panoramik deniz manzarasıyla üst düzey bir konaklama deneyimi.',
                'size' => 58,
                'rating' => 4.9,
                'review_count' => 64,
                'sort_order' => 4,
                'images' => [
                    'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?q=80&w=2400',
                    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2400',
                    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2400',
                    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2400',
                ],
            ],
            [
                'type' => 'King Suite',
                'slug' => 'king-suite',
                'title' => 'King Suite',
                'description' => 'Otelin en geniş odası. Özel jakuzili teras, geniş salon ve eksiksiz donanımla kusursuz bir tatil.',
                'size' => 78,
                'rating' => 5.0,
                'review_count' => 38,
                'sort_order' => 5,
                'images' => [
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2400',
                    'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2400',
                    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2400',
                    'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2400',
                ],
            ],
        ];

        foreach ($types as $data) {
            RoomTypeContent::query()->updateOrCreate(
                ['type' => $data['type']],
                $data,
            );
        }

        // hotel_settings satırı admin panelde zaten var (firstOrCreate ile
        // lazily oluşturuluyor) — sadece yeni eklenen address/location
        // NULL ise doldurulur, mevcut değerler asla ezilmez.
        $settings = HotelSetting::current();
        $settings->fill([
            'address' => $settings->address ?? 'Sahil Cadde No. 40, Girne, KKTC',
            'location' => $settings->location ?? 'Girne, Kuzey Kıbrıs',
        ])->save();
    }
}
