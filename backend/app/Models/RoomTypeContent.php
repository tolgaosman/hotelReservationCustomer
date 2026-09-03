<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Bu proje tarafından eklenen yeni tablo (room_type_contents). Admin
 * panelin `rooms.type` alanına karşılık gelen, tip başına tek satırlık
 * pazarlama içeriği (slug/title/description/size/rating/images).
 */
class RoomTypeContent extends Model
{
    protected $fillable = [
        'type',
        'slug',
        'title',
        'description',
        'size',
        'rating',
        'review_count',
        'images',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'size' => 'integer',
            'rating' => 'float',
            'review_count' => 'integer',
            'images' => 'array',
            'sort_order' => 'integer',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
