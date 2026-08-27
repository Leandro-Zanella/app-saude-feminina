import AsyncStorage from '@react-native-async-storage/async-storage';
import { hojeIso, somarDias } from '@/src/utilitarios';
import type { RegistroCiclo } from '@/src/tipos';

const CHAVE = 'saude-feminina:ciclos';

function registrosIniciais(): RegistroCiclo[] {
  const hoje = hojeIso();
  return [
    { id: '1', inicio: somarDias(hoje, -12), fim: somarDias(hoje, -8) },
    { id: '2', inicio: somarDias(hoje, -41), fim: somarDias(hoje, -36) },
    { id: '3', inicio: somarDias(hoje, -69), fim: somarDias(hoje, -65) },
  ];
}

export async function lerCiclos(): Promise<RegistroCiclo[]> {
  const bruto = await AsyncStorage.getItem(CHAVE);

  if (bruto === null) {
    const iniciais = registrosIniciais();
    await gravarCiclos(iniciais);
    return iniciais;
  }

  try {
    return JSON.parse(bruto) as RegistroCiclo[];
  } catch {
    return [];
  }
}

export async function gravarCiclos(registros: RegistroCiclo[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(registros));
}
