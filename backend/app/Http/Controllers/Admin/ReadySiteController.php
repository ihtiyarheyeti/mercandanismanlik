<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReadySite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReadySiteController extends Controller
{
    public function index()
    {
        $sites = ReadySite::orderBy('order')->get();
        return response()->json($sites);
    }

    public function store(Request $request)
    {
        $site = new ReadySite();
        
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('ready-sites', 'public');
            $site->image = $image;
        }

        $site->title = $request->title;
        $site->description = $request->description;
        $site->features = $request->features;
        $site->price = $request->price;
        $site->demo_link = $request->demo_link;
        $site->order = $request->order;
        
        $site->save();

        return response()->json(['message' => 'Hazır site başarıyla eklendi']);
    }

    public function update(Request $request, $id)
    {
        $site = ReadySite::findOrFail($id);
        
        if ($request->hasFile('image')) {
            if ($site->image) {
                Storage::delete('public/' . $site->image);
            }
            $image = $request->file('image')->store('ready-sites', 'public');
            $site->image = $image;
        }

        $site->title = $request->title;
        $site->description = $request->description;
        $site->features = $request->features;
        $site->price = $request->price;
        $site->demo_link = $request->demo_link;
        $site->order = $request->order;
        
        $site->save();

        return response()->json(['message' => 'Hazır site başarıyla güncellendi']);
    }

    public function destroy($id)
    {
        $site = ReadySite::findOrFail($id);
        
        if ($site->image) {
            Storage::delete('public/' . $site->image);
        }
        
        $site->delete();

        return response()->json(['message' => 'Hazır site başarıyla silindi']);
    }

    public function reorder(Request $request)
    {
        foreach ($request->items as $item) {
            ReadySite::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Sıralama başarıyla güncellendi']);
    }
} 