export type Artigo = {
  id: number;
  titulo: string;
  resumo: string | null;
  conteudoHtml: string;
  urlCapa: string | null;
  nomeAutor: string;
  criadoEm: string;
  atualizadoEm: string;
};

export type PropriedadesTelaArtigo = {
  id: number;
};
