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
