<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GeneralSettingsController extends Controller
{
    public function index()
    {
        $settings = Setting::first();
        return response()->json($settings);
    }

    public function update(Request $request)
    {
        $settings = Setting::first();
        
        if (!$settings) {
            $settings = new Setting();
        }

        // Logo işlemleri
        if ($request->hasFile('logo')) {
            if ($settings->logo) {
                Storage::delete('public/' . $settings->logo);
            }
            $logo = $request->file('logo')->store('logos', 'public');
            $settings->logo = $logo;
        }

        // İletişim bilgileri
        $settings->phone = $request->phone;
        $settings->email = $request->email;
        $settings->address = $request->address;
        $settings->working_hours = $request->working_hours;
        
        // Sosyal medya
        $settings->facebook = $request->facebook;
        $settings->twitter = $request->twitter;
        $settings->instagram = $request->instagram;
        $settings->linkedin = $request->linkedin;

        $settings->save();

        return response()->json(['message' => 'Ayarlar başarıyla güncellendi']);
    }
} 