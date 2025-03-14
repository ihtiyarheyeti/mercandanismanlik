-- Eski admin kullanıcılarını sil
DELETE FROM users WHERE email LIKE '%@admin%';

-- Yeni admin kullanıcısı oluştur
INSERT INTO users (name, email, password, is_admin, created_at, updated_at) 
VALUES (
    'Admin',
    'admin@mercandanismanlik.com',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- şifre: admin123
    1,
    NOW(),
    NOW()
); 