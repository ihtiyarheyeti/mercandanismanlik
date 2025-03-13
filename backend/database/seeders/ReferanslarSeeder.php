<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReferanslarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('referanslar')->insert([
            [
                'firmaAdi' => 'ABC Teknoloji',
                'logo' => '/images/referanslar/abc-teknoloji.png',
                'aciklama' => 'Web sitesi ve dijital pazarlama çözümleri sağladığımız teknoloji firması.',
                'websitesi' => 'https://www.abcteknoloji.com',
                'category_name' => 'Teknoloji',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'firmaAdi' => 'XYZ İnşaat',
                'logo' => '/images/referanslar/xyz-insaat.png',
                'aciklama' => 'Kurumsal web sitesi ve online proje kataloğu hazırladığımız inşaat firması.',
                'websitesi' => 'https://www.xyzinsaat.com',
                'category_name' => 'İnşaat',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'firmaAdi' => 'Delta Eğitim',
                'logo' => '/images/referanslar/delta-egitim.png',
                'aciklama' => 'Online eğitim platformu geliştirdiğimiz eğitim kurumu.',
                'websitesi' => 'https://www.deltaegitim.com',
                'category_name' => 'Eğitim',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
