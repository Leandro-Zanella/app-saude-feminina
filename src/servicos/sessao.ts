import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SessaoAutenticada } from '@/src/tipos';

const CHAVE = 'saude-feminina:sessao';

let tokenAtual: string | null = null;

export function definirToken(token: string | null): void {
  tokenAtual = token;
}

export function obterToken(): string | null {
  return tokenAtual;
}

export async function guardarSessao(sessao: SessaoAutenticada): Promise<void> {
  definirToken(sessao.token);
  await AsyncStorage.setItem(CHAVE, JSON.stringify(sessao));
}

export async function restaurarSessao(): Promise<SessaoAutenticada | null> {
  const bruto = await AsyncStorage.getItem(CHAVE);

  if (bruto === null) {
    return null;
  }

  try {
    const sessao = JSON.parse(bruto) as SessaoAutenticada;
    definirToken(sessao.token);
    return sessao;
  } catch {
    await limparSessao();
    return null;
  }
}

export async function limparSessao(): Promise<void> {
  definirToken(null);
  await AsyncStorage.removeItem(CHAVE);
}
