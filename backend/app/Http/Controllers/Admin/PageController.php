<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $query = Page::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($request->has('status')) {
            $status = $request->get('status');
            if ($status === 'active') {
                $query->where('is_active', true);
            } elseif ($status === 'inactive') {
                $query->where('is_active', false);
            } elseif ($status === 'deleted') {
                $query->onlyTrashed();
            }
        }

        $pages = $query->orderBy('order')
                      ->paginate(10);

        return response()->json($pages);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages',
            'content' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'order' => 'nullable|integer'
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $page = Page::create($validated);

        return response()->json($page, 201);
    }

    public function show($id)
    {
        $page = Page::withTrashed()->findOrFail($id);
        return response()->json($page);
    }

    public function update(Request $request, $id)
    {
        $page = Page::withTrashed()->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => ['required', 'string', 'max:255', Rule::unique('pages')->ignore($page->id)],
            'content' => 'nullable|string',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'order' => 'nullable|integer'
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $page->update($validated);

        return response()->json($page);
    }

    public function destroy($id)
    {
        $page = Page::findOrFail($id);
        $page->delete();

        return response()->noContent();
    }

    public function restore($id)
    {
        $page = Page::onlyTrashed()->findOrFail($id);
        $page->restore();

        return response()->json($page);
    }

    public function toggleStatus($id)
    {
        $page = Page::findOrFail($id);
        $page->is_active = !$page->is_active;
        $page->save();

        return response()->json($page);
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'pageIds' => 'required|array',
            'pageIds.*' => 'required|integer|exists:pages,id'
        ]);

        $pages = Page::whereIn('id', $validated['pageIds'])->get();
        
        foreach ($validated['pageIds'] as $order => $id) {
            $page = $pages->find($id);
            if ($page) {
                $page->order = $order + 1;
                $page->save();
            }
        }

        return response()->noContent();
    }
} 