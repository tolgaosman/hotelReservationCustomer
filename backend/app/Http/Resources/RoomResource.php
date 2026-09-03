<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

/**
 * Frontend'in Room tipiyle (frontend/src/lib/types.ts) birebir eşleşen
 * camelCase JSON üretir. $this->resource bir Room (temsilci oda);
 * slug/title/description/size/rating/reviewCount/images ilişkili
 * RoomTypeContent'ten gelir. İçerik satırı yoksa (henüz seed edilmemiş
 * bir tip) güvenli bir fallback kullanılır — frontend `images[0]`'ı
 * korumasız okuduğu için `images` asla null dönmemelidir.
 */
class RoomResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $content = $this->typeContent;

        return [
            'id' => $this->id,
            'number' => $this->number,
            'type' => $this->type,
            'capacity' => (int) $this->capacity,
            'nightlyRate' => (float) $this->nightly_rate,
            'amenities' => $this->amenities ?? [],
            'status' => $this->status->value,
            'slug' => $content->slug ?? Str::slug($this->type),
            'title' => $content->title ?? $this->type,
            'description' => (string) ($content->description ?? ''),
            'size' => (int) ($content->size ?? 0),
            'rating' => (float) ($content->rating ?? 0),
            'reviewCount' => (int) ($content->review_count ?? 0),
            'images' => $content->images ?? [],
            // Frontend'de kullanılmıyor ama arama/katalog sonuçlarında o
            // tipte kaç oda müsait olduğunu göstermek isteyenler için.
            // $this->attributes değil $this->resource->available_count
            // kullanılmalı — JsonResource'ta "attributes" diye bir property
            // yok, __get proxy'si model'in getAttribute()'una gider.
            'availableCount' => $this->when(
                $this->resource->available_count !== null,
                fn () => (int) $this->resource->available_count,
            ),
        ];
    }
}
