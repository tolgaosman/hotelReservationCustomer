<?php

namespace App\Http\Controllers\Api;

use App\Enums\RestaurantPaymentStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRestaurantReservationRequest;
use App\Http\Resources\RestaurantReservationResource;
use App\Models\Reservation;
use App\Models\RestaurantReservation;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Models\Customer;

class RestaurantReservationController extends Controller
{
    /** Otel misafiri olmayanlar için kişi başı sabit rezervasyon ücreti. */
    private const FEE_PER_PERSON = 350.0;

    public function index(Request $request): JsonResponse
    {
        /** @var Customer $customer */
        $customer = $request->attributes->get('customer');

        $reservations = RestaurantReservation::query()
            ->where(function($q) use ($customer) {
                $q->where('email', $customer->email)
                  ->orWhere('phone', $customer->phone);
            })
            ->orderByDesc('date')
            ->orderByDesc('time')
            ->get();

        return RestaurantReservationResource::collection($reservations)->response();
    }

    public function store(StoreRestaurantReservationRequest $request): JsonResponse
    {
        $data = $request->validated();

        $payload = [
            'full_name' => $data['fullName'],
            'phone' => $data['phone'],
            'email' => $data['email'] ?? null,
            'party_size' => $data['partySize'],
            'date' => $data['date'],
            'time' => $data['time'],
            'note' => $data['note'] ?? null,
            'is_hotel_guest' => $data['isHotelGuest'],
        ];

        if ($data['isHotelGuest']) {
            $reservation = Reservation::find($data['reservationId']);
            $diningDate = Carbon::parse($data['date']);

            $isValid = $reservation
                && $reservation->status->value !== 'cancelled'
                && $diningDate->betweenIncluded($reservation->check_in, $reservation->check_out);

            if (! $isValid) {
                throw new HttpException(422, 'Rezervasyon numarası bu tarih için geçerli değil.');
            }

            $payload['reservation_id'] = $reservation->id;
            $payload['payment_status'] = RestaurantPaymentStatus::Waived->value;
            $payload['amount'] = 0;
        } else {
            $payload['payment_status'] = RestaurantPaymentStatus::PayAtHotel->value;
            $payload['amount'] = round($data['partySize'] * self::FEE_PER_PERSON, 2);
        }

        $restaurantReservation = RestaurantReservation::create($payload);

        return (new RestaurantReservationResource($restaurantReservation))
            ->response()
            ->setStatusCode(201);
    }
}
