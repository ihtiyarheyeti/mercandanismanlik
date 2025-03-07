<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SSSSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sss')->insert([
            [
                'soru' => 'Web sitesi yaptırmanın maliyeti nedir?',
                'cevap' => 'Web sitesi maliyeti, projenin kapsamına, özelliklerine ve ihtiyaçlarınıza göre değişiklik gösterir. Detaylı bilgi için bizimle iletişime geçebilirsiniz.',
                'acik' => true,
                'category_name' => 'Maliyet',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'soru' => 'Web sitesi ne kadar sürede tamamlanır?',
                'cevap' => 'Projenin büyüklüğüne bağlı olarak 2-8 hafta arasında değişebilir. Basit bir web sitesi 2 haftada tamamlanabilirken, kapsamlı bir e-ticaret sitesi 8 haftaya kadar sürebilir.',
                'acik' => true,
                'category_name' => 'Süreç',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'soru' => 'SEO hizmetleriniz nelerdir?',
                'cevap' => 'Anahtar kelime araştırması, site içi SEO optimizasyonu, içerik optimizasyonu, teknik SEO ve backlink çalışmaları gibi kapsamlı SEO hizmetleri sunuyoruz.',
                'acik' => true,
                'category_name' => 'SEO',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
