<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Setting::first();
        return response()->json($settings);
    }

    public function updateLogo(Request $request)
    {
        try {
            \Log::info('Logo yükleme başladı');
            
            $request->validate([
                'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            \Log::info('Validasyon başarılı');

            $setting = Setting::first();
            if (!$setting) {
                $setting = new Setting();
                \Log::info('Yeni setting oluşturuldu');
            }

            if ($request->hasFile('logo')) {
                \Log::info('Logo dosyası mevcut');
                
                // Eski logoyu sil
                if ($setting->logo) {
                    $oldPath = str_replace('/storage/', '', $setting->logo);
                    \Log::info('Eski logo yolu: ' . $oldPath);
                    
                    if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                        \Log::info('Eski logo silindi');
                    }
                }

                // Yeni logoyu kaydet
                $file = $request->file('logo');
                $filename = time() . '_' . $file->getClientOriginalName();
                \Log::info('Yeni logo dosya adı: ' . $filename);
                
                // Logos klasörünün varlığını kontrol et
                if (!Storage::disk('public')->exists('logos')) {
                    Storage::disk('public')->makeDirectory('logos');
                    \Log::info('Logos klasörü oluşturuldu');
                }
                
                // Dosyayı kaydet
                $path = $file->storeAs('logos', $filename, 'public');
                if ($path) {
                    \Log::info('Dosya kaydedildi: ' . $path);
                    
                    $setting->logo = '/storage/' . $path;
                    \Log::info('Logo yolu: ' . $setting->logo);
                    
                    $setting->save();
                    \Log::info('Setting kaydedildi');

                    return response()->json([
                        'message' => 'Logo başarıyla güncellendi',
                        'logo' => $setting->logo,
                        'success' => true
                    ]);
                }

                \Log::error('Dosya kaydedilemedi');
                return response()->json([
                    'message' => 'Logo kaydedilemedi',
                    'success' => false
                ], 500);
            }

            \Log::warning('Logo dosyası bulunamadı');
            return response()->json([
                'message' => 'Logo dosyası bulunamadı',
                'success' => false
            ], 400);
        } catch (\Exception $e) {
            \Log::error('Logo yükleme hatası: ' . $e->getMessage());
            \Log::error('Hata detayı: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Logo yüklenirken bir hata oluştu: ' . $e->getMessage(),
                'success' => false
            ], 500);
        }
    }

    public function updateFavicon(Request $request)
    {
        try {
            \Log::info('Favicon yükleme başladı');
            
            $request->validate([
                'favicon' => 'required|image|mimes:ico,png|max:2048'
            ]);

            \Log::info('Validasyon başarılı');

            $setting = Setting::first();
            if (!$setting) {
                $setting = new Setting();
                \Log::info('Yeni setting oluşturuldu');
            }

            if ($request->hasFile('favicon')) {
                \Log::info('Favicon dosyası mevcut');
                
                // Eski favicon'ı sil
                if ($setting->favicon) {
                    $oldPath = str_replace('/storage/', '', $setting->favicon);
                    \Log::info('Eski favicon yolu: ' . $oldPath);
                    
                    if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                        \Log::info('Eski favicon silindi');
                    }
                }

                // Yeni favicon'ı kaydet
                $file = $request->file('favicon');
                $filename = 'favicons/' . time() . '_' . $file->getClientOriginalName();
                \Log::info('Yeni favicon dosya adı: ' . $filename);
                
                // Favicons klasörünün varlığını kontrol et
                if (!Storage::disk('public')->exists('favicons')) {
                    Storage::disk('public')->makeDirectory('favicons');
                    \Log::info('Favicons klasörü oluşturuldu');
                }
                
                // Dosyayı kaydet
                if ($file->storeAs('public', $filename)) {
                    \Log::info('Dosya kaydedildi: ' . $filename);
                    
                    $setting->favicon = '/storage/' . $filename;
                    \Log::info('Favicon yolu: ' . $setting->favicon);
                    
                    $setting->save();
                    \Log::info('Setting kaydedildi');

                    return response()->json([
                        'message' => 'Favicon başarıyla güncellendi',
                        'favicon' => $setting->favicon,
                        'success' => true
                    ]);
                }

                \Log::error('Dosya kaydedilemedi');
                return response()->json([
                    'message' => 'Favicon kaydedilemedi',
                    'success' => false
                ], 500);
            }

            \Log::warning('Favicon dosyası bulunamadı');
            return response()->json([
                'message' => 'Favicon dosyası bulunamadı',
                'success' => false
            ], 400);
        } catch (\Exception $e) {
            \Log::error('Favicon yükleme hatası: ' . $e->getMessage());
            \Log::error('Hata detayı: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Favicon yüklenirken bir hata oluştu: ' . $e->getMessage(),
                'success' => false
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $request->validate([
                'siteTitle' => 'required|string|max:255',
                'siteDescription' => 'nullable|string',
                'contactEmail' => 'required|email',
                'phoneNumber' => 'nullable|string',
                'address' => 'nullable|string',
                'workingHoursWeekday' => 'nullable|string|max:50',
                'workingHoursSaturday' => 'nullable|string|max:50',
                'workingHoursSunday' => 'nullable|string|max:50',
                'isOpenSaturday' => 'boolean',
                'isOpenSunday' => 'boolean'
            ]);

            $setting = Setting::first();
            if (!$setting) {
                $setting = new Setting();
            }

            $setting->site_title = $request->siteTitle;
            $setting->site_description = $request->siteDescription;
            $setting->contact_email = $request->contactEmail;
            $setting->phone_number = $request->phoneNumber;
            $setting->address = $request->address;
            $setting->working_hours_weekday = $request->workingHoursWeekday;
            $setting->working_hours_saturday = $request->workingHoursSaturday;
            $setting->working_hours_sunday = $request->workingHoursSunday;
            $setting->is_open_saturday = $request->isOpenSaturday;
            $setting->is_open_sunday = $request->isOpenSunday;
            $setting->save();

            return response()->json([
                'message' => 'Ayarlar başarıyla güncellendi',
                'settings' => $setting
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ayarlar güncellenirken bir hata oluştu: ' . $e->getMessage()
            ], 500);
        }
    }
} 