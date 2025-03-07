<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeoSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'meta_title',
        'meta_description',
        'meta_keywords',
        'robots_txt',
        'url_structure',
        'auto_generate_sitemap',
        'include_images_sitemap',
        'submit_to_search_engines'
    ];

    protected $casts = [
        'auto_generate_sitemap' => 'boolean',
        'include_images_sitemap' => 'boolean',
        'submit_to_search_engines' => 'boolean'
    ];
}
