<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ResetAdminSeeder extends Seeder
{
    public function run()
    {
        // Eski admin kullanıcılarını sil
        User::where('email', 'like', '%@admin%')->delete();

        // Yeni admin kullanıcısı oluştur
        User::create([
            'name' => 'Admin',
            'email' => 'admin@mercandanismanlik.com',
            'password' => Hash::make('admin123'),
            'is_admin' => true
        ]);
    }
} 