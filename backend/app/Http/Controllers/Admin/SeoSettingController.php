<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SeoSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\Sitemap\SitemapGenerator;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Blog;
use App\Models\Page;
use App\Models\BlogCategory;

class SeoSettingController extends Controller
{
    public function index()
    {
        $seoSettings = SeoSetting::first();
        return response()->json($seoSettings);
    }

    public function update(Request $request)
    {
        try {
            $validated = $request->validate([
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string|max:500',
                'meta_keywords' => 'nullable|string|max:500',
                'robots_txt' => 'nullable|string',
                'url_structure' => 'required|string|in:plain,category',
                'auto_generate_sitemap' => 'boolean',
                'include_images_sitemap' => 'boolean',
                'submit_to_search_engines' => 'boolean'
            ], [
                'meta_keywords.string' => 'Meta anahtar kelimeler virgülle ayrılmış metin olmalıdır.',
                'meta_keywords.max' => 'Meta anahtar kelimeler en fazla 500 karakter olabilir.'
            ]);

            $seoSettings = SeoSetting::firstOrCreate(
                [],
                [
                    'meta_title' => '',
                    'meta_description' => '',
                    'meta_keywords' => '',
                    'robots_txt' => "User-agent: *\nAllow: /\nDisallow: /admin/",
                    'url_structure' => 'plain',
                    'auto_generate_sitemap' => true,
                    'include_images_sitemap' => true,
                    'submit_to_search_engines' => true
                ]
            );
            
            $seoSettings->update($validated);

            return response()->json([
                'message' => 'SEO ayarları başarıyla güncellendi',
                'settings' => $seoSettings->fresh()
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validasyon hatası',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'SEO ayarları güncellenirken bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function generateSitemap()
    {
        try {
            set_time_limit(300);
            ini_set('memory_limit', '256M');
            
            $baseUrl = config('app.url');
            $sitemapPath = public_path('sitemap.xml');
            
            if (file_exists($sitemapPath)) {
                unlink($sitemapPath);
            }

            \Log::info('Sitemap oluşturma başladı. Base URL: ' . $baseUrl);

            $sitemap = Sitemap::create();

            // Ana sayfa
            $sitemap->add(Url::create('/')
                ->setLastModificationDate(now())
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
                ->setPriority(1.0));

            // Sabit sayfalar
            $staticPages = [
                '/hizmetlerimiz' => 'Hizmetlerimiz',
                '/hazir-site' => 'Hazır Site',
                '/araclar' => 'Araçlar',
                '/blog' => 'Blog',
                '/sss' => 'SSS',
                '/hakkimizda' => 'Hakkımızda',
                '/iletisim' => 'İletişim'
            ];

            foreach ($staticPages as $url => $title) {
                $sitemap->add(Url::create($url)
                    ->setLastModificationDate(now())
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority(0.8));
            }

            // Blog kategorileri
            $categories = BlogCategory::all();
            foreach ($categories as $category) {
                $sitemap->add(Url::create("/blog/kategori/{$category->slug}")
                    ->setLastModificationDate($category->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority(0.7));
            }

            // Blog yazıları
            $blogs = Blog::orderBy('published_at', 'desc')->get();
            foreach ($blogs as $blog) {
                $sitemap->add(Url::create("/blog/{$blog->slug}")
                    ->setLastModificationDate($blog->updated_at ?? $blog->published_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setPriority(0.6));
            }

            // SSS kategorileri
            $sssCategories = ['genel', 'teknik', 'fiyatlandirma'];
            foreach ($sssCategories as $category) {
                $sitemap->add(Url::create("/sss/{$category}")
                    ->setLastModificationDate(now())
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setPriority(0.6));
            }

            // Hazır site kategorileri
            $hazirSiteCategories = ['kurumsal', 'e-ticaret', 'kisisel', 'blog'];
            foreach ($hazirSiteCategories as $category) {
                $sitemap->add(Url::create("/hazir-site/{$category}")
                    ->setLastModificationDate(now())
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setPriority(0.7));
            }

            // Dinamik sayfalar (CMS'den gelenler)
            $pages = Page::where('is_active', true)->get();
            foreach ($pages as $page) {
                $sitemap->add(Url::create("/sayfa/{$page->slug}")
                    ->setLastModificationDate($page->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY)
                    ->setPriority(0.5));
            }

            // Site haritasını kaydet
            $sitemap->writeToFile($sitemapPath);
            
            \Log::info('Sitemap başarıyla oluşturuldu: ' . $sitemapPath);

            return response()->json([
                'message' => 'Site haritası başarıyla oluşturuldu',
                'sitemap_url' => url('sitemap.xml'),
                'url_count' => count($sitemap->getTags()) // Eklenen URL sayısı
            ]);
        } catch (\Exception $e) {
            \Log::error('Sitemap oluşturma hatası: ' . $e->getMessage());
            \Log::error('Hata ayrıntıları: ' . $e->getTraceAsString());
            
            return response()->json([
                'message' => 'Site haritası oluşturulurken bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function submitToSearchEngines()
    {
        try {
            $sitemapPath = public_path('sitemap.xml');
            
            if (!file_exists($sitemapPath)) {
                return response()->json([
                    'message' => 'Site haritası bulunamadı. Lütfen önce site haritası oluşturun.',
                    'error' => 'Sitemap.xml dosyası mevcut değil'
                ], 404);
            }

            $sitemapUrl = url('sitemap.xml');
            $client = new Client([
                'timeout' => 10,
                'verify' => false,
                'http_errors' => false
            ]);

            \Log::info('Site haritası gönderimi başladı: ' . $sitemapUrl);

            // Google'a gönder
            $googleUrl = "https://www.google.com/ping?sitemap=" . urlencode($sitemapUrl);
            \Log::info('Google\'a gönderiliyor: ' . $googleUrl);
            $googleResponse = $client->get($googleUrl);
            
            // Bing'e gönder
            $bingUrl = "https://www.bing.com/ping?sitemap=" . urlencode($sitemapUrl);
            \Log::info('Bing\'e gönderiliyor: ' . $bingUrl);
            $bingResponse = $client->get($bingUrl);

            \Log::info('Google yanıtı: ' . $googleResponse->getStatusCode());
            \Log::info('Bing yanıtı: ' . $bingResponse->getStatusCode());

            return response()->json([
                'message' => 'Site haritası arama motorlarına başarıyla gönderildi',
                'sitemap_url' => $sitemapUrl,
                'responses' => [
                    'google' => $googleResponse->getStatusCode(),
                    'bing' => $bingResponse->getStatusCode()
                ]
            ]);
        } catch (GuzzleException $e) {
            \Log::error('HTTP istek hatası: ' . $e->getMessage());
            return response()->json([
                'message' => 'Arama motorlarına bağlanırken bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            \Log::error('Site haritası gönderme hatası: ' . $e->getMessage());
            \Log::error('Hata detayları: ' . $e->getTraceAsString());
            
            return response()->json([
                'message' => 'Site haritası gönderilirken bir hata oluştu',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
