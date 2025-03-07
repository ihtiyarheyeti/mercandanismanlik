<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'logo',
        'favicon',
        'site_title',
        'site_description',
        'contact_email',
        'phone_number',
        'address',
        'working_hours_weekday',
        'working_hours_saturday',
        'working_hours_sunday',
        'is_open_saturday',
        'is_open_sunday'
    ];
} 