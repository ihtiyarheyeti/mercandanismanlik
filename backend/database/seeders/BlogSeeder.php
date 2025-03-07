<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogCategory;
use App\Models\Blog;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        // Örnek kategori oluştur
        $category = BlogCategory::create([
            'name' => 'Dijital Pazarlama',
            'slug' => 'dijital-pazarlama',
            'description' => 'Dijital pazarlama ile ilgili blog yazıları'
        ]);

        // Örnek blog yazısı oluştur
        Blog::create([
            'title' => 'SEO Optimizasyonu Nasıl Yapılır?',
            'content' => '<h2>SEO Nedir?</h2><p>SEO (Search Engine Optimization), web sitelerinin arama motorlarında daha iyi sıralamalarda yer alması için yapılan çalışmaların bütünüdür.</p><h2>SEO\'nun Önemi</h2><p>İyi bir SEO stratejisi, web sitenizin organik trafiğini artırır ve potansiyel müşterilere ulaşmanızı sağlar.</p>',
            'excerpt' => 'SEO optimizasyonu hakkında detaylı bir rehber',
            'author_name' => 'Admin',
            'category_id' => $category->id,
            'tags' => ['SEO', 'Dijital Pazarlama', 'Web'],
            'published_at' => now()
        ]);
    }
} 