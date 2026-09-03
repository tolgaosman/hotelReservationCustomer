<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\HotelSettingResource;
use App\Models\HotelSetting;

class SettingController extends Controller
{
    public function show(): HotelSettingResource
    {
        return new HotelSettingResource(HotelSetting::current());
    }
}
