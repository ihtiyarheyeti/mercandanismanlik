<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReadySite extends Model
{
    protected $fillable = [
        'title',
        'description',
        'features',
        'price',
        'image',
        'demo_link',
        'order'
    ];

    protected $casts = [
        'features' => 'array',
        'price' => 'decimal:2'
    ];
} 