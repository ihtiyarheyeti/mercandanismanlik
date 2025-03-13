<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReferenceController extends Controller
{
    public function index()
    {
        $references = Reference::all();
        return response()->json($references);
    }

    public function store(Request $request)
    {
        $reference = new Reference();
        
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('references', 'public');
            $reference->image = $image;
        }

        $reference->title = $request->title;
        $reference->description = $request->description;
        $reference->link = $request->link;
        $reference->order = $request->order;
        
        $reference->save();

        return response()->json(['message' => 'Referans başarıyla eklendi']);
    }

    public function update(Request $request, $id)
    {
        $reference = Reference::findOrFail($id);
        
        if ($request->hasFile('image')) {
            if ($reference->image) {
                Storage::delete('public/' . $reference->image);
            }
            $image = $request->file('image')->store('references', 'public');
            $reference->image = $image;
        }

        $reference->title = $request->title;
        $reference->description = $request->description;
        $reference->link = $request->link;
        $reference->order = $request->order;
        
        $reference->save();

        return response()->json(['message' => 'Referans başarıyla güncellendi']);
    }

    public function destroy($id)
    {
        $reference = Reference::findOrFail($id);
        
        if ($reference->image) {
            Storage::delete('public/' . $reference->image);
        }
        
        $reference->delete();

        return response()->json(['message' => 'Referans başarıyla silindi']);
    }
} 