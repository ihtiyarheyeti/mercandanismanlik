<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    public function index()
    {
        try {
            $settings = Setting::first();
            if (!$settings) {
                $settings = new Setting();
                $settings->save();
            }

            return response()->json($settings);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            \Log::info('Genel ayarlar güncelleme başladı');
            \Log::info('Gelen veri:', $request->all());
            
            $validated = $request->validate([
                'site_title' => 'nullable|string|max:255',
                'site_description' => 'nullable|string',
                'contact_email' => 'nullable|email',
                'phone_number' => 'nullable|string',
                'address' => 'nullable|string',
                'working_hours_weekday' => 'nullable|string|max:50',
                'working_hours_saturday' => 'nullable|string|max:50',
                'working_hours_sunday' => 'nullable|string|max:50',
                'is_open_saturday' => 'boolean',
                'is_open_sunday' => 'boolean',
                'logo_height' => 'nullable|integer|min:40|max:200'
            ]);

            \Log::info('Validasyon başarılı');

            $settings = Setting::first();
            if (!$settings) {
                $settings = new Setting();
                \Log::info('Yeni settings oluşturuldu');
            }

            // Frontend'den gelen verileri doğrudan atama
            $settings->fill($validated);
            $settings->save();

            \Log::info('Ayarlar başarıyla kaydedildi');

            return response()->json([
                'message' => 'Ayarlar başarıyla güncellendi',
                'settings' => $settings
            ]);
        } catch (\Exception $e) {
            \Log::error('Ayarlar güncellenirken hata: ' . $e->getMessage());
            \Log::error('Hata detayı: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Ayarlar güncellenirken bir hata oluştu: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateLogo(Request $request)
    {
        try {
            \Log::info('Logo yükleme başladı');
            
            $request->validate([
                'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            \Log::info('Validasyon başarılı');

            if ($request->hasFile('logo')) {
                \Log::info('Logo dosyası mevcut');
                
                $file = $request->file('logo');
                $filename = time() . '_' . $file->getClientOriginalName();
                
                \Log::info('Yeni logo dosya adı: ' . $filename);
                
                // Logos klasörünün varlığını kontrol et
                if (!Storage::disk('public')->exists('logos')) {
                    Storage::disk('public')->makeDirectory('logos');
                    \Log::info('Logos klasörü oluşturuldu');
                }
                
                // Eski logoyu sil
                $settings = Setting::first();
                if ($settings && $settings->logo) {
                    $oldPath = str_replace('/storage/', '', $settings->logo);
                    \Log::info('Eski logo yolu: ' . $oldPath);
                    
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                        \Log::info('Eski logo silindi');
                    }
                }
                
                // Yeni logoyu kaydet
                $path = Storage::disk('public')->putFileAs('logos', $file, $filename);
                if ($path) {
                    \Log::info('Dosya kaydedildi: ' . $path);
                    
                    if (!$settings) {
                        $settings = new Setting();
                        \Log::info('Yeni settings oluşturuldu');
                    }
                    
                    $settings->logo = '/storage/' . $path;
                    \Log::info('Logo yolu: ' . $settings->logo);
                    
                    $settings->save();
                    \Log::info('Settings kaydedildi');

                    return response()->json([
                        'message' => 'Logo başarıyla güncellendi',
                        'logo' => url($settings->logo)
                    ]);
                }
                
                \Log::error('Dosya kaydedilemedi');
                return response()->json([
                    'message' => 'Logo yüklenemedi'
                ], 500);
            }

            \Log::warning('Logo dosyası bulunamadı');
            return response()->json([
                'message' => 'Logo dosyası bulunamadı'
            ], 400);
        } catch (\Exception $e) {
            \Log::error('Logo yükleme hatası: ' . $e->getMessage());
            \Log::error('Hata detayı: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Logo yüklenirken bir hata oluştu: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateFavicon(Request $request)
    {
        try {
            \Log::info('Favicon yükleme başladı');
            
            $request->validate([
                'favicon' => 'required|image|mimes:ico,png|max:1024'
            ]);

            \Log::info('Validasyon başarılı');

            if ($request->hasFile('favicon')) {
                \Log::info('Favicon dosyası mevcut');
                
                $file = $request->file('favicon');
                $filename = time() . '_' . $file->getClientOriginalName();
                
                \Log::info('Yeni favicon dosya adı: ' . $filename);
                
                // Favicons klasörünün varlığını kontrol et
                if (!Storage::disk('public')->exists('favicons')) {
                    Storage::disk('public')->makeDirectory('favicons');
                    \Log::info('Favicons klasörü oluşturuldu');
                }
                
                // Eski favicon'ı sil
                $settings = Setting::first();
                if ($settings && $settings->favicon) {
                    $oldPath = str_replace('/storage/', '', $settings->favicon);
                    \Log::info('Eski favicon yolu: ' . $oldPath);
                    
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                        \Log::info('Eski favicon silindi');
                    }
                }
                
                // Yeni favicon'ı kaydet
                $path = Storage::disk('public')->putFileAs('favicons', $file, $filename);
                if ($path) {
                    \Log::info('Dosya kaydedildi: ' . $path);
                    
                    if (!$settings) {
                        $settings = new Setting();
                        \Log::info('Yeni settings oluşturuldu');
                    }
                    
                    $settings->favicon = '/storage/' . $path;
                    \Log::info('Favicon yolu: ' . $settings->favicon);
                    
                    $settings->save();
                    \Log::info('Settings kaydedildi');

                    return response()->json([
                        'message' => 'Favicon başarıyla güncellendi',
                        'favicon' => url($settings->favicon)
                    ]);
                }
                
                \Log::error('Dosya kaydedilemedi');
                return response()->json([
                    'message' => 'Favicon yüklenemedi'
                ], 500);
            }

            \Log::warning('Favicon dosyası bulunamadı');
            return response()->json([
                'message' => 'Favicon dosyası bulunamadı'
            ], 400);
        } catch (\Exception $e) {
            \Log::error('Favicon yükleme hatası: ' . $e->getMessage());
            \Log::error('Hata detayı: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Favicon yüklenirken bir hata oluştu: ' . $e->getMessage()
            ], 500);
        }
    }
} 