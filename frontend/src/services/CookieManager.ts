interface Cookie {
  name: string;
  category: 'necessary' | 'functional' | 'analytics' | 'marketing';
  description: string;
  duration: string;
  provider: string;
  active: boolean;
}

interface CookieCategories {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

class CookieManager {
  private static instance: CookieManager;
  private cookies: Cookie[] = [];
  private categories: CookieCategories = {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false
  };

  private constructor() {
    this.detectCookies();
    this.loadPreferences();
  }

  public static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }

  private detectCookies(): void {
    // Mevcut çerezleri tespit et
    const currentCookies = document.cookie.split(';');
    
    currentCookies.forEach(cookie => {
      const [name] = cookie.split('=');
      if (name.trim()) {
        this.addCookie({
          name: name.trim(),
          category: this.detectCookieCategory(name.trim()),
          description: this.getCookieDescription(name.trim()),
          duration: this.getCookieDuration(name.trim()),
          provider: window.location.hostname,
          active: true
        });
      }
    });

    // Bilinen çerezleri ekle
    this.addKnownCookies();
  }

  private addKnownCookies(): void {
    const knownCookies: Cookie[] = [
      {
        name: '_ga',
        category: 'analytics',
        description: 'Google Analytics tarafından ziyaretçileri ayırt etmek için kullanılır',
        duration: '2 yıl',
        provider: 'Google',
        active: false
      },
      {
        name: '_gid',
        category: 'analytics',
        description: 'Google Analytics tarafından ziyaretçileri ayırt etmek için kullanılır',
        duration: '24 saat',
        provider: 'Google',
        active: false
      },
      {
        name: 'cookieConsent',
        category: 'necessary',
        description: 'Çerez tercihlerinizi saklar',
        duration: '1 yıl',
        provider: 'Mercan Danışmanlık',
        active: true
      }
    ];

    knownCookies.forEach(cookie => {
      if (!this.cookies.find(c => c.name === cookie.name)) {
        this.cookies.push(cookie);
      }
    });
  }

  private detectCookieCategory(name: string): 'necessary' | 'functional' | 'analytics' | 'marketing' {
    if (name.startsWith('_ga') || name.startsWith('_gid')) return 'analytics';
    if (name.includes('consent')) return 'necessary';
    if (name.includes('preferences')) return 'functional';
    if (name.includes('ads') || name.includes('marketing')) return 'marketing';
    return 'functional';
  }

  private getCookieDescription(name: string): string {
    const descriptions: Record<string, string> = {
      '_ga': 'Google Analytics tarafından ziyaretçileri ayırt etmek için kullanılır',
      '_gid': 'Google Analytics tarafından günlük ziyaretçi istatistikleri için kullanılır',
      'cookieConsent': 'Çerez tercihlerinizi saklar'
    };
    return descriptions[name] || 'Bu çerez site fonksiyonları için kullanılmaktadır';
  }

  private getCookieDuration(name: string): string {
    const durations: Record<string, string> = {
      '_ga': '2 yıl',
      '_gid': '24 saat',
      'cookieConsent': '1 yıl'
    };
    return durations[name] || 'Oturum sonuna kadar';
  }

  public getCookies(): Cookie[] {
    return this.cookies;
  }

  public getCookiesByCategory(category: keyof CookieCategories): Cookie[] {
    return this.cookies.filter(cookie => cookie.category === category);
  }

  public getCategories(): CookieCategories {
    return this.categories;
  }

  public savePreferences(categories: CookieCategories): void {
    this.categories = categories;
    localStorage.setItem('cookiePreferences', JSON.stringify(categories));
    
    // Devre dışı bırakılan kategorilerdeki çerezleri sil
    Object.entries(categories).forEach(([category, enabled]) => {
      if (!enabled) {
        this.deleteCookiesByCategory(category as keyof CookieCategories);
      }
    });
  }

  private loadPreferences(): void {
    const saved = localStorage.getItem('cookiePreferences');
    if (saved) {
      this.categories = JSON.parse(saved);
    }
  }

  private deleteCookiesByCategory(category: keyof CookieCategories): void {
    const cookies = this.getCookiesByCategory(category);
    cookies.forEach(cookie => {
      document.cookie = `${cookie.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
  }

  private addCookie(cookie: Cookie): void {
    if (!this.cookies.find(c => c.name === cookie.name)) {
      this.cookies.push(cookie);
    }
  }
}

export default CookieManager; 