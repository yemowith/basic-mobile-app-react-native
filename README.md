# Base Mobile App React Native + Tailwind

Modern React Native mobil uygulama projesi - Expo Router ve NativeWind (Tailwind CSS) ile geliştirilmiştir.

## 🚀 Özellikler

- ⚡ **Expo Router** - Dosya tabanlı routing sistemi
- 🎨 **NativeWind v4** - Tailwind CSS ile stil yönetimi
- 📱 **Cross-platform** - iOS, Android ve Web desteği
- 🔥 **TypeScript** - Tip güvenliği
- 🎭 **React Native Reanimated** - Yüksek performanslı animasyonlar
- 🎯 **Modern UI Components** - Özelleştirilebilir UI bileşenleri
- 🌙 **Dark Mode** - Otomatik tema desteği
- 📦 **Modüler Yapı** - Organize edilmiş kod yapısı

## 📋 Gereksinimler

- **Node.js**: v18 veya üzeri
- **npm** veya **yarn**: Paket yöneticisi
- **Expo CLI**: Global olarak yüklü (`npm install -g expo-cli`)
- **iOS Simulator** (Mac için) veya **Android Studio** (Android için)

## 🛠️ Kurulum

### 1. Bağımlılıkları Yükleyin

```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlatın

```bash
npm start
```

veya platforma özel:

```bash
npm run ios      # iOS için
npm run android  # Android için
npm run web      # Web için
```

## 📁 Proje Yapısı

```
youway-mobile-app/
├── app/                    # Expo Router sayfaları
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Ana sayfa
├── components/            # React bileşenleri
│   ├── ui/               # UI bileşenleri (Button, Text, View)
│   └── layout/           # Layout bileşenleri
├── hooks/                # Custom React hooks
│   └── useColorScheme.ts # Tema hook'u
├── lib/                  # Yardımcı kütüphaneler
│   ├── api/              # API client
│   ├── utils/            # Utility fonksiyonları
│   └── constants/        # Sabitler
├── contexts/             # React Context providers
├── types/                # TypeScript type tanımları
├── assets/               # Görseller, fontlar vb.
├── global.css            # Global Tailwind stilleri
├── tailwind.config.js    # Tailwind konfigürasyonu
├── babel.config.js       # Babel konfigürasyonu
├── metro.config.js       # Metro bundler konfigürasyonu
└── tsconfig.json         # TypeScript konfigürasyonu
```

## 🎨 Kullanılan Teknolojiler

### Core
- **Expo** (~54.0.32) - React Native framework
- **React** (19.1.0) - UI kütüphanesi
- **React Native** (0.81.5) - Mobil uygulama framework'ü
- **TypeScript** (~5.9.2) - Tip güvenliği

### Routing & Navigation
- **Expo Router** (~6.0.4) - Dosya tabanlı routing
- **React Navigation** (^7.1.6) - Navigasyon kütüphanesi

### Styling
- **NativeWind** (^4.2.1) - Tailwind CSS for React Native
- **Tailwind CSS** (^3.4.19) - Utility-first CSS framework

### Animations
- **React Native Reanimated** (~4.1.0) - Performanslı animasyonlar
- **@legendapp/motion** (^2.5.3) - Motion library

### Icons & Graphics
- **@expo/vector-icons** (^15.0.2) - Icon seti
- **lucide-react-native** (^0.510.0) - Modern icon library
- **react-native-svg** (15.12.1) - SVG desteği

### Storage
- **@react-native-async-storage/async-storage** (^2.2.0) - Async storage

## 🎯 Kullanım

### Yeni Sayfa Ekleme

Expo Router dosya tabanlı routing kullanır. Yeni bir sayfa eklemek için `app/` klasörüne yeni bir dosya ekleyin:

```typescript
// app/about.tsx
import { View, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Hakkında</Text>
    </View>
  );
}
```

### NativeWind ile Stil Verme

NativeWind, Tailwind CSS class'larını React Native'de kullanmanıza olanak sağlar:

```typescript
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-2xl font-bold text-primary-500">
        Merhaba Dünya
      </Text>
    </View>
  );
}
```

### UI Component Kullanımı

Projede hazır UI bileşenleri mevcuttur:

```typescript
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { View } from '@/components/ui/View';

export default function MyScreen() {
  return (
    <View className="flex-1 p-4">
      <Text className="text-xl mb-4">Başlık</Text>
      <Button
        onPress={() => console.log('Tıklandı')}
        variant="primary"
        size="md"
      >
        Tıkla
      </Button>
    </View>
  );
}
```

## 🔧 Konfigürasyon

### Tailwind CSS

`tailwind.config.js` dosyasında özel renkler ve tema ayarlarını yapabilirsiniz:

```javascript
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#1a4960',
          // ... diğer renkler
        },
      },
    },
  },
};
```

### Path Alias

TypeScript path alias'ları `tsconfig.json` içinde tanımlıdır:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Kullanım:
```typescript
import { Button } from '@/components/ui/Button';
import { useColorScheme } from '@/hooks/useColorScheme';
```

## 📱 Platform Desteği

- ✅ iOS
- ✅ Android
- ✅ Web

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

Daha fazla sorun giderme bilgisi için `install.md` dosyasına bakın.

## 📚 Kaynaklar

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 Lisans

Bu proje private bir projedir.

## 👥 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen önce bir issue açın veya pull request gönderin.

---

**Not:** Detaylı kurulum rehberi için `install.md` dosyasına bakın.
