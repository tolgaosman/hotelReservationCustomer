<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchRequest;
use App\Http\Resources\RoomResource;
use App\Models\HotelSetting;
use App\Models\Room;
use App\Support\RoomCatalog;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SearchController extends Controller
{
    /**
     * Verilen tarih aralığında, misafir sayısına yeten ve o tarihlerde
     * dolu olmayan (Room::freeBetween) oda tiplerini döner. Şekil
     * RoomController@index ile aynıdır ki AvailabilityResults.tsx ikisini
     * de aynı şekilde okuyabilsin.
     */
    public function store(SearchRequest $request): AnonymousResourceCollection
    {
        $data = $request->validated();

        $rooms = RoomCatalog::representatives(
            Room::query()
                ->available()
                ->freeBetween($data['arrival'], $data['departure'], $data['excludeReservationId'] ?? null)
                ->where('capacity', '>=', $data['guests'])
        );

        $nights = Carbon::parse($data['arrival'])->diffInDays(Carbon::parse($data['departure']));

        return RoomResource::collection($rooms)->additional([
            'meta' => [
                'nights' => $nights,
                'taxRate' => (float) HotelSetting::current()->tax_rate,
            ],
        ]);
    }
}
