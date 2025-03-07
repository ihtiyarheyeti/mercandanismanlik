<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::orderBy('order')->get();
        return response()->json($pages);
    }

    public function show($slug)
    {
        $page = Page::where('slug', $slug)->where('is_active', true)->firstOrFail();
        return response()->json($page);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean',
            'order' => 'integer',
            'template' => 'string|in:default,home,full-width,sidebar',
            'show_in_menu' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('featured_image');
        $data['slug'] = Str::slug($request->title);

        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('pages', 'public');
            $data['featured_image'] = '/storage/' . $path;
        }

        $page = Page::create($data);
        return response()->json($page, 201);
    }

    public function update(Request $request, $id)
    {
        $page = Page::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'boolean',
            'order' => 'integer',
            'template' => 'string|in:default,home,full-width,sidebar',
            'show_in_menu' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except('featured_image');

        if ($request->hasFile('featured_image')) {
            // Eski görseli sil
            if ($page->featured_image) {
                $oldPath = str_replace('/storage/', '', $page->featured_image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('featured_image')->store('pages', 'public');
            $data['featured_image'] = '/storage/' . $path;
        }

        $page->update($data);
        return response()->json($page);
    }

    public function destroy($id)
    {
        $page = Page::findOrFail($id);

        // Ana sayfa ve Hakkımızda sayfası silinemez
        if (in_array($page->slug, ['ana-sayfa', 'hakkimizda'])) {
            return response()->json(['message' => 'Bu sayfa silinemez'], 403);
        }

        // Görseli sil
        if ($page->featured_image) {
            $path = str_replace('/storage/', '', $page->featured_image);
            Storage::disk('public')->delete($path);
        }

        $page->delete();
        return response()->json(['message' => 'Sayfa başarıyla silindi']);
    }

    public function updateOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pages' => 'required|array',
            'pages.*.id' => 'required|exists:pages,id',
            'pages.*.order' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        foreach ($request->pages as $pageData) {
            Page::where('id', $pageData['id'])->update(['order' => $pageData['order']]);
        }

        return response()->json(['message' => 'Sayfa sıralaması güncellendi']);
    }
} 