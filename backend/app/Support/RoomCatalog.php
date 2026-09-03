<?php

namespace App\Support;

use App\Models\Room;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

/**
 * DB'de 60 fiziksel oda var (5 tipten 12'şer), ama frontend katalogda tip
 * başına tek kart bekliyor (slug'lar "standart", "deluxe" vb. tip
 * bazlı). Bu sınıf verilen sorgudaki odaları tipe göre gruplar ve her
 * grup için en düşük id'li odayı "temsilci" seçer; grubun boyutunu da
 * availableCount olarak ekler.
 */
class RoomCatalog
{
    /**
     * @return Collection<int, Room>
     */
    public static function representatives(Builder $query): Collection
    {
        return $query->with('typeContent')
            ->get()
            ->groupBy('type')
            ->map(function (Collection $group) {
                /** @var Room $representative */
                $representative = $group->sortBy('id')->first();
                $representative->setAttribute('available_count', $group->count());

                return $representative;
            })
            ->values()
            ->sortBy(fn (Room $room) => $room->typeContent->sort_order ?? 999)
            ->values();
    }
}
