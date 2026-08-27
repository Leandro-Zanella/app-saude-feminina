import Constants from 'expo-constants';
import { Platform } from 'react-native';

const PORTA_API = 8080;

function descobrirHost(): string {
  if (Platform.OS === 'web') {
    return 'localhost';
  }

  const hostDoMetro = Constants.expoConfig?.hostUri?.split(':')[0];

  if (!hostDoMetro || hostDoMetro === 'localhost' || hostDoMetro === '127.0.0.1') {
    return Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
  }

  return hostDoMetro;
}

export const URL_BASE_API = process.env.EXPO_PUBLIC_API_URL ?? `http://${descobrirHost()}:${PORTA_API}`;

export function montarUrlMidia(caminho: string | null): string | null {
  if (!caminho) {
    return null;
  }
  if (/^https?:\/\//.test(caminho)) {
    return caminho;
  }
  return `${URL_BASE_API}${caminho.startsWith('/') ? '' : '/'}${caminho}`;
}
