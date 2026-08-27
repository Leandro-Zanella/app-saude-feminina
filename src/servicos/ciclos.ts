import { gravarCiclos, lerCiclos } from './mock/ciclos';
import type { DadosCiclo, RegistroCiclo } from '@/src/tipos';

export async function listarCiclos(): Promise<RegistroCiclo[]> {
  const registros = await lerCiclos();
  return ordenarDoMaisRecente(registros);
}

export async function registrarCiclo(dados: DadosCiclo): Promise<RegistroCiclo[]> {
  const registros = await lerCiclos();
  const novo: RegistroCiclo = { id: String(Date.now()), ...dados };
  await gravarCiclos([...registros, novo]);
  return ordenarDoMaisRecente([...registros, novo]);
}

export async function removerCiclo(id: string): Promise<RegistroCiclo[]> {
  const registros = await lerCiclos();
  const restantes = registros.filter((registro) => registro.id !== id);
  await gravarCiclos(restantes);
  return ordenarDoMaisRecente(restantes);
}

function ordenarDoMaisRecente(registros: RegistroCiclo[]): RegistroCiclo[] {
  return [...registros].sort((a, b) => b.inicio.localeCompare(a.inicio));
}
