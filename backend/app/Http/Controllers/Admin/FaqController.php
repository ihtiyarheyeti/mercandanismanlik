<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function index()
    {
        $faqs = Faq::orderBy('order')->get();
        return response()->json($faqs);
    }

    public function store(Request $request)
    {
        $faq = new Faq();
        $faq->question = $request->question;
        $faq->answer = $request->answer;
        $faq->order = $request->order;
        $faq->save();

        return response()->json(['message' => 'SSS başarıyla eklendi']);
    }

    public function update(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);
        $faq->question = $request->question;
        $faq->answer = $request->answer;
        $faq->order = $request->order;
        $faq->save();

        return response()->json(['message' => 'SSS başarıyla güncellendi']);
    }

    public function destroy($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();

        return response()->json(['message' => 'SSS başarıyla silindi']);
    }

    public function reorder(Request $request)
    {
        foreach ($request->items as $item) {
            Faq::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Sıralama başarıyla güncellendi']);
    }
} 