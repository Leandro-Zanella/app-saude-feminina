import { requisitar } from './clienteHttp';
import { montarUrlMidia } from './configuracao';
import type { Artigo, RespostaArtigo } from '@/src/tipos';

export async function listarArtigos(): Promise<Artigo[]> {
  const resposta = await requisitar<RespostaArtigo[]>('/api/article');
  return resposta.map(paraArtigo);
}

export async function obterArtigo(id: number): Promise<Artigo> {
  const resposta = await requisitar<RespostaArtigo>(`/api/article/${id}`);
  return paraArtigo(resposta);
}

function paraArtigo(resposta: RespostaArtigo): Artigo {
  return {
    id: resposta.id,
    titulo: resposta.title,
    resumo: resposta.summary,
    conteudoHtml: resposta.contentHtml,
    urlCapa: montarUrlMidia(resposta.coverImageUrl),
    nomeAutor: resposta.authorName,
    criadoEm: resposta.createdAt,
    atualizadoEm: resposta.updatedAt,
  };
}
