<?php

namespace Database\Seeders;

use App\Models\Addon;
use Illuminate\Database\Seeder;

/**
 * Idempotent: `updateOrCreate(['name' => ...])` ile çalışır, birden fazla
 * kez çalıştırılabilir. `icon` alanları frontend'de lucide-react ikon
 * isimleriyle eşleşecek şekilde kısa/kebap-case tutulur.
 */
class AddonSeeder extends Seeder
{
    public function run(): void
    {
        $addons = [
            [
                'name' => 'Havalimanı Transferi',
                'description' => 'Özel araçla havalimanı-otel arası gidiş-dönüş transfer hizmeti.',
                'price' => 750,
                'icon' => 'car',
                'is_active' => true,
            ],
            [
                'name' => 'Spa Paketi',
                'description' => 'Masaj, sauna ve buhar odası kullanımını içeren tam gün spa deneyimi.',
                'price' => 1200,
                'icon' => 'sparkles',
                'is_active' => true,
            ],
            [
                'name' => 'Erken Check-in',
                'description' => 'Standart giriş saatinden önce odanıza erken yerleşme garantisi.',
                'price' => 400,
                'icon' => 'clock',
                'is_active' => true,
            ],
            [
                'name' => 'Geç Check-out',
                'description' => 'Standart çıkış saatinden sonra odanızı kullanmaya devam etme imkanı.',
                'price' => 400,
                'icon' => 'clock',
                'is_active' => true,
            ],
            [
                'name' => 'Kahvaltı Paketi',
                'description' => 'Konaklama süresince açık büfe zengin kahvaltı hizmeti.',
                'price' => 550,
                'icon' => 'coffee',
                'is_active' => true,
            ],
            [
                'name' => 'Bebek Yatağı',
                'description' => 'Odanıza ek bebek karyolası ve bebek bakım seti kurulumu.',
                'price' => 250,
                'icon' => 'baby',
                'is_active' => true,
            ],
            [
                'name' => 'Romantik Oda Dekorasyonu',
                'description' => 'Gül yaprakları, mum ve balonlarla özel gün odanızı hazırlıyoruz.',
                'price' => 900,
                'icon' => 'heart',
                'is_active' => true,
            ],
            [
                'name' => 'Özel Şef Menüsü',
                'description' => 'Odanıza veya restorana özel, şefimizin hazırladığı akşam yemeği menüsü.',
                'price' => 1500,
                'icon' => 'chef-hat',
                'is_active' => true,
            ],
        ];

        foreach ($addons as $data) {
            Addon::query()->updateOrCreate(
                ['name' => $data['name']],
                $data,
            );
        }
    }
}
