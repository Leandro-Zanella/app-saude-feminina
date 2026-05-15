import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProvedorUsuario } from '@/src/contextos';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ProvedorUsuario>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }} />
        </ProvedorUsuario>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
