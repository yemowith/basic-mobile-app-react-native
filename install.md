# Expo + React Native Projesi Kurulum Rehberi
## (Gluestack UI Olmadan - NativeWind + Expo Router)

Bu rehber, Expo Router ve NativeWind (Tailwind CSS) kullanan, Gluestack UI olmadan bir React Native mobil uygulama projesi kurulumunu açıklar.

---

## 📋 Gereksinimler

- **Node.js**: v18 veya üzeri
- **npm** veya **yarn**: Paket yöneticisi
- **Expo CLI**: Global olarak yüklü (`npm install -g expo-cli`)
- **iOS Simulator** (Mac için) veya **Android Studio** (Android için)

---

## 🚀 Adım 1: Proje Oluşturma

```bash
# Expo projesi oluştur
npx create-expo-app@latest . --template blank-typescript


```

---

## 📦 Adım 2: NPM Konfigürasyonu

React 19 ile bazı paketlerin (özellikle `lucide-react-native`) peer dependency uyarıları olabilir. Bunu çözmek için proje kök dizininde `.npmrc` dosyası oluşturun:

```bash
# .npmrc dosyası oluştur
echo "legacy-peer-deps=true" > .npmrc
```

Bu dosya, tüm npm komutlarının otomatik olarak `--legacy-peer-deps` flag'ini kullanmasını sağlar.

## 📦 Adım 3: Temel Bağımlılıkları Yükleme

### Expo Router ve Navigasyon
```bash
npx expo install expo-router@~6.0.4 react-native-screens@~4.16.0 react-native-safe-area-context@^5.6.1 @react-navigation/native@^7.1.6
```

### NativeWind (Tailwind CSS)

**NOT:** Expo 54, React 19.1.0 bekler. NativeWind v4 ile React 19.1.0 kullanılabilir. Eğer `react-dom` peer dependency hatası alırsanız:

```bash
# Expo'nun önerdiği React sürümünü kullan (önerilen)
npx expo install react@19.1.0 @types/react@~19.1.10

# NativeWind ve Tailwind CSS'i kur
npm install nativewind@^4.2.1 tailwindcss@^3.4.17
npx expo install react-native-reanimated@~4.1.0
```

**Alternatif:** Eğer NativeWind ile React 19.1.0'da sorun yaşarsanız, React 19.2.4'e yükseltebilirsiniz (Expo uyarı verebilir ama genellikle çalışır):
```bash
npx expo install react@19.2.4 @types/react@~19.2.0
```

### Expo Temel Modülleri
```bash
npx expo install expo-font@~14.0.8 expo-splash-screen@~31.0.10 expo-status-bar@~3.0.8 expo-linking@~8.0.8 expo-web-browser@~15.0.7 expo-system-ui@~6.0.7
```

### İkonlar ve Görseller

**NOT:** `.npmrc` dosyası oluşturduysanız (Adım 2), aşağıdaki komutlar otomatik olarak `--legacy-peer-deps` kullanacaktır:

```bash
npx expo install @expo/vector-icons@^15.0.2 lucide-react-native@^0.510.0 react-native-svg@15.12.1
```

Eğer `.npmrc` dosyası yoksa ve `lucide-react-native` kurulumunda hata alırsanız:
```bash
npm install lucide-react-native@^0.510.0 --legacy-peer-deps
```

### State Management ve Storage
```bash
npx expo install @react-native-async-storage/async-storage@^2.2.0
```

### Animasyon (Opsiyonel)
```bash
npx expo install react-native-reanimated@~4.1.0
npm install @legendapp/motion@^2.4.0
```

### Diğer Yardımcı Kütüphaneler
```bash
npm install babel-plugin-module-resolver@^5.0.2
```

---

## ⚙️ Adım 4: TypeScript Konfigürasyonu

`tsconfig.json` dosyasını oluştur/güncelle:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"],
      "tailwind.config": ["./tailwind.config.js"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "nativewind-env.d.ts"
  ]
}
```

`nativewind-env.d.ts` dosyası oluştur:

```typescript
/// <reference types="nativewind/types" />
```

---

## 🎨 Adım 5: Tailwind CSS ve NativeWind Konfigürasyonu

### Tailwind Config Oluştur

`tailwind.config.js` dosyası oluştur:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{html,js,jsx,ts,tsx,mdx}',
    './components/**/*.{html,js,jsx,ts,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Projenize özel renkler
        primary: {
          50: '#e4f2fa',
          100: '#cce5f5',
          200: '#99cbeb',
          300: '#66b1e1',
          400: '#3397d7',
          500: '#1a4960', // Ana renk
          600: '#1e7fa8',
          700: '#195873',
          800: '#0f2b3c',
          900: '#0a1e2a',
        },
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
```

### Global CSS Dosyası

`global.css` dosyası oluştur:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🔧 Adım 6: Babel Konfigürasyonu

`babel.config.js` dosyasını güncelle:

```javascript
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ['babel-preset-expo'],
      'nativewind/babel'
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            'tailwind.config': './tailwind.config.js',
          },
        },
      ],
      'react-native-reanimated/plugin', // Reanimated plugin en sonda olmalı
    ],
  };
};
```

---

## 📱 Adım 7: Metro Bundler Konfigürasyonu

`metro.config.js` dosyasını oluştur/güncelle:

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```

---

## 📂 Adım 8: Expo Router Konfigürasyonu

`app.json` dosyasını güncelle:

```json
{
  "expo": {
    "name": "youway-mobile-app",
    "slug": "youway-mobile-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-font"
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

---

## 🏗️ Adım 9: Proje Yapısı Oluşturma

Temel klasör yapısını oluştur:

```
youway-mobile-app/
├── app/
│   ├── _layout.tsx          # Root layout
│   ├── index.tsx            # Landing/Home page
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx
│       └── profile.tsx
├── components/
│   ├── ui/                  # Custom UI components
│   └── layout/              # Layout components
├── lib/
│   ├── api/                 # API client
│   ├── utils/               # Utility functions
│   └── constants/           # Constants
├── contexts/                # React Context providers
├── hooks/                   # Custom hooks
├── types/                   # TypeScript types
├── assets/                  # Images, fonts, etc.
├── global.css               # Global styles
├── tailwind.config.js       # Tailwind config
├── babel.config.js          # Babel config
├── metro.config.js          # Metro config
├── tsconfig.json            # TypeScript config
└── package.json
```

---

## 📝 Adım 10: Root Layout Oluşturma

`app/_layout.tsx` dosyası oluştur:

```typescript
import '@/global.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';

export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Slot />
    </ThemeProvider>
  );
}
```

`hooks/useColorScheme.ts` oluştur:

```typescript
import { useColorScheme as useRNColorScheme } from 'react-native';

export function useColorScheme() {
  return useRNColorScheme();
}
```

---

## 🎯 Adım 11: Temel UI Component'leri Oluşturma

### Button Component

`components/ui/Button.tsx`:

```typescript
import React from 'react';
import { Pressable, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  className = '',
}: ButtonProps) {
  const baseStyle: ViewStyle = {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  };

  const sizeStyles: Record<string, ViewStyle> = {
    sm: { paddingVertical: 8, paddingHorizontal: 16, minHeight: 36 },
    md: { paddingVertical: 12, paddingHorizontal: 24, minHeight: 44 },
    lg: { paddingVertical: 16, paddingHorizontal: 32, minHeight: 52 },
  };

  const variantStyles: Record<string, ViewStyle> = {
    primary: { backgroundColor: '#1a4960' },
    secondary: { backgroundColor: '#1e7fa8' },
    outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#1a4960' },
  };

  const textStyles: Record<string, TextStyle> = {
    primary: { color: '#ffffff' },
    secondary: { color: '#ffffff' },
    outline: { color: '#1a4960' },
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled || isLoading}
      style={({ pressed }) => [
        baseStyle,
        sizeStyles[size],
        variantStyles[variant],
        { opacity: pressed || isDisabled ? 0.6 : 1 },
      ]}
      className={className}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? '#1a4960' : '#ffffff'} />
      ) : (
        <Text style={[{ fontWeight: '600' }, textStyles[variant]]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}
```

### Text Component

`components/ui/Text.tsx`:

```typescript
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
  className?: string;
}

export function Text({ className = '', style, ...props }: TextProps) {
  return <RNText className={className} style={style} {...props} />;
}
```

### View Component

`components/ui/View.tsx`:

```typescript
import React from 'react';
import { View as RNView, ViewProps as RNViewProps } from 'react-native';

interface ViewProps extends RNViewProps {
  className?: string;
}

export function View({ className = '', style, ...props }: ViewProps) {
  return <RNView className={className} style={style} {...props} />;
}
```

---

## 🧪 Adım 12: Test Sayfası Oluşturma

`app/index.tsx` oluştur:

```typescript
import { View, Text } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-2xl font-bold text-primary-500 mb-4">
        YouWay Mobile App
      </Text>
      <Text className="text-gray-600 mb-8 text-center">
        Expo Router + NativeWind ile kuruldu
      </Text>
      <Button
        onPress={() => router.push('/login')}
        variant="primary"
        size="md"
      >
        Giriş Yap
      </Button>
    </View>
  );
}
```

---

## 🚀 Adım 13: Projeyi Çalıştırma

```bash
# Development server'ı başlat
npm start

# iOS için
npm run ios

# Android için
npm run android

# Web için
npm run web
```

---

## 📚 Ekstra Özellikler (Opsiyonel)

### Context API ile State Management

`contexts/AuthContext.tsx` örneği:

```typescript
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);

  const login = async (email: string, password: string) => {
    // Login logic
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### API Client

`lib/api/client.ts`:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('authToken');
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
```

---

## ✅ Kontrol Listesi

- [ ] Expo projesi oluşturuldu
- [ ] Tüm bağımlılıklar yüklendi
- [ ] TypeScript konfigürasyonu yapıldı
- [ ] Tailwind CSS ve NativeWind kuruldu
- [ ] Babel ve Metro konfigürasyonu yapıldı
- [ ] Expo Router konfigürasyonu yapıldı
- [ ] Root layout oluşturuldu
- [ ] Temel UI component'leri oluşturuldu
- [ ] Test sayfası oluşturuldu
- [ ] Proje başarıyla çalışıyor

---

## 🐛 Sorun Giderme

### NativeWind stilleri çalışmıyor
- `global.css` dosyasının `app/_layout.tsx` içinde import edildiğinden emin olun
- Metro bundler'ı yeniden başlatın: `npm start -- --clear`

### TypeScript hataları
- `nativewind-env.d.ts` dosyasının oluşturulduğundan emin olun
- `tsconfig.json` içindeki path alias'ların doğru olduğundan emin olun

### Expo Router çalışmıyor
- `app.json` içinde `expo-router` plugin'inin eklendiğinden emin olun
- `package.json` içinde `main: "expo-router/entry"` olduğundan emin olun

### NativeWind kurulumunda React sürüm çakışması (ERESOLVE)
Eğer `react-dom` peer dependency hatası alıyorsanız:
- **Önerilen:** Expo'nun önerdiği React sürümünü kullanın: `npx expo install react@19.1.0 @types/react@~19.1.10`
- `.npmrc` dosyası oluşturulduysa (`legacy-peer-deps=true`), bu sorun otomatik olarak çözülür
- Alternatif olarak `--legacy-peer-deps` flag'i ile kurulum yapabilirsiniz: `npm install nativewind@^4.2.1 tailwindcss@^3.4.17 --legacy-peer-deps`

### Expo React sürüm uyarısı
Eğer Expo, React sürümünün uyumsuz olduğunu söylüyorsa:
- Expo 54 için önerilen: `react@19.1.0` ve `@types/react@~19.1.10`
- Bu sürümleri yüklemek için: `npx expo install react@19.1.0 @types/react@~19.1.10`

### İkonlar kurulumunda React sürüm çakışması (lucide-react-native)
Eğer `lucide-react-native@0.510.0` peer dependency hatası alıyorsanız (React 19 ile):
- **Çözüm:** Proje kök dizininde `.npmrc` dosyası oluşturun: `echo "legacy-peer-deps=true" > .npmrc`
- Bu dosya oluşturulduktan sonra `npx expo install` komutları otomatik olarak `--legacy-peer-deps` kullanacaktır
- `lucide-react-native` React 19'u resmi olarak desteklemiyor, ancak `.npmrc` ile sorunsuz çalışır
- Alternatif olarak sadece `@expo/vector-icons` kullanabilirsiniz (React 19 uyumlu)

---

## 📖 Kaynaklar

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Native Documentation](https://reactnative.dev/)

---

## 🎉 Tamamlandı!

Artık Gluestack UI olmadan, NativeWind ve Expo Router kullanan bir React Native projeniz hazır!
