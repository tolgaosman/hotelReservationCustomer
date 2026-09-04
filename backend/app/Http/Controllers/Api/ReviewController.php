<?php

namespace App\Http\Controllers\Api;

use App\Enums\ReservationStatus;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Reservation;
use App\Models\Review;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ReviewController extends Controller
{
    public function index()
    {
        return Review::with(['room', 'reservation.guest'])
            ->where('is_approved', true)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'reservation_id' => 'required|exists:reservations,id',
            'room_id' => 'nullable|exists:rooms,id',
            'guest_name' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        /** @var Customer $customer */
        $customer = $request->attributes->get('customer');

        $reservation = Reservation::with('guest')
            ->findOrFail($validated['reservation_id']);

        if ($reservation->guest->customer_id !== $customer->id) {
            throw new HttpException(403, 'Bu rezervasyon hesabınıza ait değil.');
        }

        if (! empty($validated['room_id']) && (int) $reservation->room_id !== (int) $validated['room_id']) {
            throw new HttpException(422, 'Seçilen oda bu rezervasyonla eşleşmiyor.');
        }

        if ($reservation->status === ReservationStatus::Cancelled) {
            throw new HttpException(422, 'İptal edilmiş bir rezervasyon için değerlendirme yapılamaz.');
        }

        if ($reservation->check_in->isAfter(Carbon::today())) {
            throw new HttpException(422, 'Henüz gerçekleşmemiş bir konaklama için değerlendirme yapılamaz.');
        }

        $review = Review::create([
            'room_id' => $validated['room_id'] ?? $reservation->room_id,
            'reservation_id' => $reservation->id,
            'guest_name' => $validated['guest_name'] ?: $reservation->guest->full_name,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
        ]);

        return response()->json($review, 201);
    }
}