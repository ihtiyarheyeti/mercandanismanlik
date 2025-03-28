<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BlogCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description'
    ];

    public function blogs(): HasMany
    {
        return $this->hasMany(Blog::class, 'category_id');
    }
} 