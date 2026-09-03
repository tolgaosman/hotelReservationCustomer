<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use App\Models\RoomTypeContent;
use App\Support\RoomCatalog;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RoomController extends Controller
{
    /**
     * Müşteriye açık, müsait odaların tip bazlı kataloğu.
     */
    public function index(): AnonymousResourceCollection
    {
        $rooms = RoomCatalog::representatives(Room::query()->available());

        return RoomResource::collection($rooms);
    }

    /**
     * Slug'a göre tekil oda (tip) detayı. Route model binding 404'ü
     * otomatik verir (RoomTypeContent bulunamazsa).
     */
    public function show(RoomTypeContent $roomTypeContent): RoomResource
    {
        $room = Room::query()->where('type', $roomTypeContent->type)
            ->available()
            ->orderBy('id')
            ->first();

        // Bu tipte şu an müsait oda yoksa bile detay sayfası 404
        // vermemeli — tip genelinde herhangi bir odayı temsilci al.
        if (! $room) {
            $room = Room::query()->where('type', $roomTypeContent->type)
                ->orderBy('id')
                ->first();
        }

        abort_if(! $room, 404);

        $room->setRelation('typeContent', $roomTypeContent);

        return new RoomResource($room);
    }
}
