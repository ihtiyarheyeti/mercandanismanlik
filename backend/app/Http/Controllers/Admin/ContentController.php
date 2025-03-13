<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    public function index()
    {
        $content = Content::first();
        return response()->json($content);
    }

    public function update(Request $request)
    {
        $request->validate([
            'contentId' => 'required|string',
            'content' => 'required|string',
        ]);

        $content = Content::firstOrNew();
        $data = $content->data ?? [];
        
        // contentId'ye göre içeriği güncelle
        $parts = explode('-', $request->contentId);
        $current = &$data;
        
        foreach ($parts as $part) {
            if (!isset($current[$part])) {
                $current[$part] = [];
            }
            $current = &$current[$part];
        }
        
        // Eğer resim base64 ise kaydet
        if (strpos($request->content, 'data:image') === 0) {
            $image = $request->content;
            $image = str_replace('data:image/png;base64,', '', $image);
            $image = str_replace('data:image/jpeg;base64,', '', $image);
            $image = str_replace(' ', '+', $image);
            
            $imageName = uniqid() . '.png';
            Storage::disk('public')->put('uploads/' . $imageName, base64_decode($image));
            
            $current = '/storage/uploads/' . $imageName;
        } else {
            $current = $request->content;
        }
        
        $content->data = $data;
        $content->save();
        
        return response()->json(['success' => true]);
    }
} 