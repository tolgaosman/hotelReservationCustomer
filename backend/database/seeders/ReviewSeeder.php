<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\Room;
use Illuminate\Database\Seeder;

/**
 * Idempotent: `updateOrCreate(['guest_name' => ..., 'comment' => ...])` ile
 * çalışır, DB_SEED_ON_BOOT=true iken her açılışta tekrar çalışsa da yorum
 * çoğalmaz. Yorumlar oda tiplerine göre dağıtılır (her tipin ilk odası).
 * `approved: false` olanlar admin onayı bekleyen yorumlardır.
 */
class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $roomByType = Room::query()->orderBy('number')->get()->unique('type')->keyBy('type');
        if ($roomByType->isEmpty()) {
            return;
        }

        $reviews = [
            // Onaylı yorumlar
            ['Standart', 'Ahmet Yılmaz', 5, 'Otel personeli inanılmaz ilgiliydi ve odalar çok temizdi. Harika bir tatil geçirdik, herkese tavsiye ederim.', true],
            ['Standart', 'Elif Demir', 4, 'Genel olarak güzeldi ancak sabah kahvaltısında daha fazla çeşit olabilirdi. Yine de tekrar geleceğiz.', true],
            ['Standart', 'Murat Şahin', 5, 'Fiyatına göre çok temiz ve konforlu bir oda. Resepsiyon çalışanları çok nazikti.', true],
            ['Deluxe', 'Kaan Öztürk', 5, 'Balkondan deniz manzarası muhteşemdi. Sabah kahvemizi balkonda içmek unutulmaz bir deneyimdi.', true],
            ['Deluxe', 'Selin Aydın', 5, 'Yatak inanılmaz rahattı, oda ferah ve çok şık. Mini bar seçenekleri de gayet iyiydi.', true],
            ['Deluxe', 'Burak Koç', 4, 'Manzara ve konum harika. Akşamları havuz başı biraz kalabalıktı ama hizmet kalitesi yüksekti.', true],
            ['Aile Odası', 'Zeynep Çelik', 5, 'Çocuklarla gittik, iki ayrı yatak alanı bize çok büyük kolaylık sağladı. Personel çocuklara çok ilgiliydi.', true],
            ['Aile Odası', 'Hakan Polat', 4, 'Oda geniş ve temizdi, oturma alanı çok işimize yaradı. Bebek karyolası talebimiz hemen karşılandı.', true],
            ['Aile Odası', 'Derya Kılıç', 5, 'Ailecek çok memnun kaldık. Kahvaltı çeşitliliği ve çocuk dostu ortam için teşekkürler.', true],
            ['Suite', 'Emre Tunç', 5, 'Jakuzili suit tam bir lüks. Panoramik manzara eşliğinde geçirdiğimiz akşam harikaydı.', true],
            ['Suite', 'Gizem Yıldız', 5, 'Yıldönümümüz için kaldık, romantik dekorasyon paketi mükemmeldi. Kesinlikle tekrar geleceğiz.', true],
            ['King Suite', 'Cem Aksoy', 5, 'Özel terası ve concierge hizmetiyle tek kelimeyle mükemmel. Fiyatını fazlasıyla hak ediyor.', true],
            ['King Suite', 'Nilay Erdem', 5, 'Şef hizmeti ve geniş salon sayesinde ailece unutulmaz bir hafta sonu geçirdik.', true],
            ['Deluxe', 'Mehmet Kara', 5, 'Restoran şefleri harikalar yaratıyor, kesinlikle beklentimizin üzerindeydi!', true],

            // Onay bekleyen yorumlar
            ['Standart', 'Ayşe Kaya', 3, 'Oda manzarası çok güzeldi fakat spa bölümü oldukça kalabalıktı. Daha iyi yönetilebilir.', false],
            ['Deluxe', 'Caner Arslan', 5, 'Odalar geniş ve ferah. Ailecek çok memnun kaldık, teşekkürler Oasis Resort.', false],
            ['Aile Odası', 'Ece Yalçın', 2, 'Odamıza ekstra havlu istedik fakat çok geç getirildi. Hizmet hızının artırılması lazım.', false],
        ];

        foreach ($reviews as [$type, $guest, $rating, $comment, $approved]) {
            $room = $roomByType->get($type) ?? $roomByType->first();

            Review::query()->updateOrCreate(
                ['guest_name' => $guest, 'comment' => $comment],
                ['room_id' => $room->id, 'rating' => $rating, 'is_approved' => $approved],
            );
        }
    }
}
