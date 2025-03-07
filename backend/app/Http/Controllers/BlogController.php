<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('category')
            ->orderBy('published_at', 'desc')
            ->get()
            ->map(function ($blog) {
                return [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'content' => $blog->content,
                    'excerpt' => $blog->excerpt,
                    'author_name' => $blog->author_name,
                    'category_id' => $blog->category_id,
                    'category_name' => $blog->category->name,
                    'featured_image' => $blog->featured_image,
                    'tags' => $blog->tags,
                    'published_at' => $blog->published_at
                ];
            });

        return response()->json($blogs);
    }

    public function show($id)
    {
        $blog = Blog::with('category')->findOrFail($id);
        
        return response()->json([
            'id' => $blog->id,
            'title' => $blog->title,
            'content' => $blog->content,
            'excerpt' => $blog->excerpt,
            'author_name' => $blog->author_name,
            'category_id' => $blog->category_id,
            'category_name' => $blog->category->name,
            'featured_image' => $blog->featured_image,
            'tags' => $blog->tags,
            'published_at' => $blog->published_at
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'category_id' => 'required|exists:blog_categories,id',
            'featured_image' => 'nullable|image|max:2048',
            'tags' => 'nullable|string'
        ]);

        $data = $request->all();
        
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('blog-images', 'public');
            $data['featured_image'] = '/storage/' . $path;
        }

        if (isset($data['tags'])) {
            $data['tags'] = array_map('trim', explode(',', $data['tags']));
        }

        $data['author_name'] = auth()->user()->name;
        $data['published_at'] = now();

        $blog = Blog::create($data);

        return response()->json($blog, 201);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string',
            'category_id' => 'required|exists:blog_categories,id',
            'featured_image' => 'nullable|image|max:2048',
            'tags' => 'nullable|string'
        ]);

        $data = $request->all();

        if ($request->hasFile('featured_image')) {
            // Eski görseli sil
            if ($blog->featured_image) {
                $oldPath = str_replace('/storage/', '', $blog->featured_image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('featured_image')->store('blog-images', 'public');
            $data['featured_image'] = '/storage/' . $path;
        }

        if (isset($data['tags'])) {
            $data['tags'] = array_map('trim', explode(',', $data['tags']));
        }

        $blog->update($data);

        return response()->json($blog);
    }

    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);

        if ($blog->featured_image) {
            $path = str_replace('/storage/', '', $blog->featured_image);
            Storage::disk('public')->delete($path);
        }

        $blog->delete();

        return response()->json(['message' => 'Blog yazısı başarıyla silindi']);
    }

    public function categories()
    {
        $categories = BlogCategory::all();
        return response()->json($categories);
    }
} 