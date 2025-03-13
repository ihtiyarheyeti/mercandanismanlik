<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Page extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'featured_image',
        'is_active',
        'order',
        'template',
        'show_in_menu'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'show_in_menu' => 'boolean',
        'order' => 'integer'
    ];

    // Başlık değiştiğinde otomatik olarak slug oluştur
    public static function boot()
    {
        parent::boot();
        
        static::creating(function ($page) {
            if (!$page->slug) {
                $page->slug = Str::slug($page->title);
            }
        });

        static::updating(function ($page) {
            if ($page->isDirty('title') && !$page->isDirty('slug')) {
                $page->slug = Str::slug($page->title);
            }
        });
    }

    // Varsayılan sayfaları oluştur
    public static function createDefaultPages()
    {
        $pages = [
            [
                'title' => 'Ana Sayfa',
                'slug' => 'ana-sayfa',
                'content' => '<h1>Mercan Danışmanlık\'a Hoş Geldiniz</h1><p>Dijital dünyada başarıya ulaşmanız için yanınızdayız.</p>',
                'meta_title' => 'Mercan Danışmanlık - Dijital Pazarlama ve Web Tasarım',
                'meta_description' => 'Profesyonel dijital pazarlama ve web tasarım hizmetleri. SEO, sosyal medya yönetimi ve daha fazlası için Mercan Danışmanlık.',
                'order' => 1,
                'template' => 'home'
            ],
            [
                'title' => 'Hakkımızda',
                'slug' => 'hakkimizda',
                'content' => '<h1>Hakkımızda</h1><p>Mercan Danışmanlık olarak, işletmenizin dijital dünyada başarıya ulaşması için gereken tüm hizmetleri sunuyoruz.</p>',
                'meta_title' => 'Hakkımızda - Mercan Danışmanlık',
                'meta_description' => 'Mercan Danışmanlık hakkında detaylı bilgi alın. Vizyonumuz, misyonumuz ve değerlerimiz.',
                'order' => 2,
                'template' => 'default'
            ],
            [
                'title' => 'Hizmetlerimiz',
                'slug' => 'hizmetler',
                'content' => '<h1>Hizmetlerimiz</h1><p>Size özel dijital çözümler sunuyoruz.</p>',
                'meta_title' => 'Hizmetlerimiz - Mercan Danışmanlık',
                'meta_description' => 'Web tasarım, SEO, sosyal medya yönetimi ve daha fazla dijital pazarlama hizmeti.',
                'order' => 3,
                'template' => 'full-width'
            ],
            [
                'title' => 'Araçlar',
                'slug' => 'araclar',
                'content' => '<h1>Dijital Pazarlama Araçları</h1><p>İşinizi büyütmenize yardımcı olacak profesyonel araçlar.</p>',
                'meta_title' => 'Dijital Pazarlama Araçları - Mercan Danışmanlık',
                'meta_description' => 'SEO analizi, sosyal medya yönetimi ve performans takibi için profesyonel araçlar.',
                'order' => 4,
                'template' => 'sidebar'
            ],
            [
                'title' => 'Blog',
                'slug' => 'blog',
                'content' => '<h1>Blog</h1><p>Dijital pazarlama dünyasından güncel haberler ve ipuçları.</p>',
                'meta_title' => 'Blog - Mercan Danışmanlık',
                'meta_description' => 'Dijital pazarlama, SEO ve web tasarım hakkında güncel blog yazıları.',
                'order' => 5,
                'template' => 'sidebar'
            ],
            [
                'title' => 'Referanslar',
                'slug' => 'referanslar',
                'content' => '<h1>Referanslarımız</h1><p>Başarı hikayelerimiz ve mutlu müşterilerimiz.</p>',
                'meta_title' => 'Referanslar - Mercan Danışmanlık',
                'meta_description' => 'Mercan Danışmanlık müşteri portföyü ve başarı hikayeleri.',
                'order' => 6,
                'template' => 'full-width'
            ],
            [
                'title' => 'SSS',
                'slug' => 'sss',
                'content' => '<h1>Sıkça Sorulan Sorular</h1><p>Hizmetlerimiz hakkında merak edilenler.</p>',
                'meta_title' => 'SSS - Mercan Danışmanlık',
                'meta_description' => 'Dijital pazarlama ve web tasarım hizmetlerimiz hakkında sıkça sorulan sorular.',
                'order' => 7,
                'template' => 'default'
            ],
            [
                'title' => 'Hazır Site',
                'slug' => 'hazir-site',
                'content' => '<h1>Hazır Site Paketleri</h1><p>Hızlı ve ekonomik web site çözümleri.</p>',
                'meta_title' => 'Hazır Site Paketleri - Mercan Danışmanlık',
                'meta_description' => 'Uygun fiyatlı ve hızlı teslim web site paketleri.',
                'order' => 8,
                'template' => 'full-width'
            ],
            [
                'title' => 'İletişim',
                'slug' => 'iletisim',
                'content' => '<h1>İletişim</h1><p>Bizimle iletişime geçin.</p>',
                'meta_title' => 'İletişim - Mercan Danışmanlık',
                'meta_description' => 'Mercan Danışmanlık iletişim bilgileri ve formu.',
                'order' => 9,
                'template' => 'default'
            ]
        ];

        foreach ($pages as $page) {
            self::firstOrCreate(['slug' => $page['slug']], $page);
        }
    }
} 