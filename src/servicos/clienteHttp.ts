import { URL_BASE_API } from './configuracao';
import { obterToken } from './sessao';
import type { ErrosPorCampo } from '@/src/tipos';

const TEMPO_LIMITE_MS = 15000;

const MENSAGENS_POR_STATUS: Record<number, string> = {
  400: 'Dados inválidos.',
  401: 'Sessão expirada. Entre novamente.',
  403: 'Você não tem permissão para acessar isto.',
  404: 'Recurso não encontrado.',
  409: 'Este e-mail já está em uso.',
};

export class ErroApi extends Error {
  readonly status: number;
  readonly errosPorCampo: ErrosPorCampo | null;

  constructor(status: number, mensagem: string, errosPorCampo: ErrosPorCampo | null = null) {
    super(mensagem);
    this.name = 'ErroApi';
    this.status = status;
    this.errosPorCampo = errosPorCampo;
  }

  get ehFalhaDeConexao(): boolean {
    return this.status === 0;
  }
}

type OpcoesRequisicao = {
  metodo?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  corpo?: unknown;
  autenticado?: boolean;
};

export async function requisitar<T>(caminho: string, opcoes: OpcoesRequisicao = {}): Promise<T> {
  const { metodo = 'GET', corpo, autenticado = true } = opcoes;

  const cabecalhos: Record<string, string> = { Accept: 'application/json' };

  if (corpo !== undefined) {
    cabecalhos['Content-Type'] = 'application/json';
  }

  if (autenticado) {
    const token = obterToken();
    if (!token) {
      throw new ErroApi(401, MENSAGENS_POR_STATUS[401]);
    }
    cabecalhos.Authorization = `Bearer ${token}`;
  }

  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TEMPO_LIMITE_MS);

  let resposta: Response;
  try {
    resposta = await fetch(`${URL_BASE_API}${caminho}`, {
      method: metodo,
      headers: cabecalhos,
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
      signal: controlador.signal,
    });
  } catch (erro) {
    const abortado = erro instanceof Error && erro.name === 'AbortError';
    throw new ErroApi(
      0,
      abortado
        ? 'A API demorou demais para responder.'
        : `Não foi possível falar com a API em ${URL_BASE_API}.`,
    );
  } finally {
    clearTimeout(temporizador);
  }

  return interpretarResposta<T>(resposta);
}

async function interpretarResposta<T>(resposta: Response): Promise<T> {
  const corpo = await lerCorpo(resposta);

  if (resposta.ok) {
    return corpo as T;
  }

  if (ehObjeto(corpo) && typeof corpo.message === 'string') {
    throw new ErroApi(resposta.status, corpo.message);
  }

  if (resposta.status === 400 && ehMapaDeTextos(corpo)) {
    const errosPorCampo = corpo as ErrosPorCampo;
    const primeiraMensagem = Object.values(errosPorCampo)[0] ?? MENSAGENS_POR_STATUS[400];
    throw new ErroApi(400, primeiraMensagem, errosPorCampo);
  }

  throw new ErroApi(
    resposta.status,
    MENSAGENS_POR_STATUS[resposta.status] ?? `Erro inesperado da API (${resposta.status}).`,
  );
}

async function lerCorpo(resposta: Response): Promise<unknown> {
  const texto = await resposta.text();
  if (!texto) {
    return null;
  }
  try {
    return JSON.parse(texto);
  } catch {
    return texto;
  }
}

function ehObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === 'object' && valor !== null && !Array.isArray(valor);
}

function ehMapaDeTextos(valor: unknown): boolean {
  return ehObjeto(valor) && Object.values(valor).every((item) => typeof item === 'string');
}
