<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $room = \App\Models\Room::first();
        if (!$room) return;

        // Onaylanan Yorumlar (Approved)
        \App\Models\Review::create([
            'room_id' => $room->id,
            'guest_name' => 'Ahmet Yılmaz',
            'rating' => 5,
            'comment' => 'Otel personeli inanılmaz ilgiliydi ve odalar çok temizdi. Harika bir tatil geçirdik, herkese tavsiye ederim.',
            'is_approved' => true,
        ]);

        \App\Models\Review::create([
            'room_id' => $room->id,
            'guest_name' => 'Elif Demir',
            'rating' => 4,
            'comment' => 'Genel olarak güzeldi ancak sabah kahvaltısında daha fazla çeşit olabilirdi. Yine de tekrar geleceğiz.',
            'is_approved' => true,
        ]);

        \App\Models\Review::create([
            'room_id' => $room->id,
            'guest_name' => 'Kaan Öztürk',
            'rating' => 5,
            'comment' => 'Muhteşem bir deneyimdi. Restoran şefleri harikalar yaratıyor, kesinlikle beklentimizin üzerindeydi!',
            'is_approved' => true,
        ]);

        // Onay Bekleyen Yorumlar (Pending)
        \App\Models\Review::create([
            'room_id' => $room->id,
            'guest_name' => 'Ayşe Kaya',
            'rating' => 3,
            'comment' => 'Oda manzarası çok güzeldi fakat spa bölümü oldukça kalabalıktı. Daha iyi yönetilebilir.',
            'is_approved' => false,
        ]);

        \App\Models\Review::create([
            'room_id' => $room->id,
            'guest_name' => 'Caner Arslan',
            'rating' => 5,
            'comment' => 'Odalar geniş ve ferah. Ailecek çok memnun kaldık, teşekkürler Oasis Resort.',
            'is_approved' => false,
        ]);
        
        \App\Models\Review::create([
            'room_id' => $room->id,
            'guest_name' => 'Zeynep Çelik',
            'rating' => 2,
            'comment' => 'Odamıza ekstra havlu istedik fakat çok geç getirildi. Hizmet hızının artırılması lazım.',
            'is_approved' => false,
        ]);
    }
}
