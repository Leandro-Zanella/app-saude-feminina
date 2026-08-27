import type { PrevisaoCiclo, RegistroCiclo } from '@/src/tipos';

const DURACAO_PADRAO_DIAS = 5;
const CICLO_PADRAO_DIAS = 28;
const CICLO_MINIMO_DIAS = 15;
const MS_POR_DIA = 86400000;

export function hojeIso(): string {
  return paraIso(new Date());
}

export function somarDias(dataIso: string, dias: number): string {
  const data = paraData(dataIso);
  data.setDate(data.getDate() + dias);
  return paraIso(data);
}

export function diferencaEmDias(inicioIso: string, fimIso: string): number {
  return Math.round((paraData(fimIso).getTime() - paraData(inicioIso).getTime()) / MS_POR_DIA);
}

export function calcularPrevisao(registros: RegistroCiclo[]): PrevisaoCiclo | null {
  const hoje = hojeIso();
  const ocorridos = registros.filter((registro) => registro.inicio <= hoje);

  if (ocorridos.length === 0) {
    return null;
  }

  const ordenados = [...ocorridos].sort((a, b) => b.inicio.localeCompare(a.inicio));

  const fechados = ordenados.filter((registro) => registro.fim !== null);
  const duracaoMediaDias = fechados.length
    ? Math.round(media(fechados.map((registro) => diferencaEmDias(registro.inicio, registro.fim!) + 1)))
    : DURACAO_PADRAO_DIAS;

  const ciclos = ordenados
    .slice(0, -1)
    .map((registro, indice) => diferencaEmDias(ordenados[indice + 1].inicio, registro.inicio));

  const historicoSuficiente = ciclos.length > 0;
  const cicloMedioDias = historicoSuficiente
    ? Math.max(CICLO_MINIMO_DIAS, Math.round(media(ciclos)))
    : CICLO_PADRAO_DIAS;

  let proximoInicio = somarDias(ordenados[0].inicio, cicloMedioDias);
  while (proximoInicio < hoje) {
    proximoInicio = somarDias(proximoInicio, cicloMedioDias);
  }

  return {
    proximoInicio,
    proximoFim: somarDias(proximoInicio, duracaoMediaDias - 1),
    duracaoMediaDias,
    cicloMedioDias,
    diasParaProximo: diferencaEmDias(hoje, proximoInicio),
    historicoSuficiente,
  };
}

function paraData(dataIso: string): Date {
  return new Date(`${dataIso}T00:00:00`);
}

function paraIso(data: Date): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function media(numeros: number[]): number {
  return numeros.reduce((total, numero) => total + numero, 0) / numeros.length;
}
