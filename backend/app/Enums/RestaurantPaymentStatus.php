<?php

namespace App\Enums;

enum RestaurantPaymentStatus: string
{
    case Waived = 'waived';
    case Paid = 'paid';
}
