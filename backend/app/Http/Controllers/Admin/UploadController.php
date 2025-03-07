<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            
            // uploads dizini yoksa oluştur
            if (!Storage::disk('public')->exists('uploads')) {
                Storage::disk('public')->makeDirectory('uploads');
            }
            
            // Dosyayı kaydet
            $path = $file->storeAs('uploads', $filename, 'public');
            
            return response()->json([
                'url' => '/storage/' . $path,
                'success' => true
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Dosya yüklenirken bir hata oluştu: ' . $e->getMessage(),
                'success' => false
            ], 500);
        }
    }
} 