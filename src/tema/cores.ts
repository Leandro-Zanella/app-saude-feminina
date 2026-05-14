export const Cores = {
  fundo: '#EFEEEE',
  cartao: '#FFFFFF',
  bordaCartao: '#E5E5E5',

  textoPrimario: '#1A1A1A',
  textoSecundario: '#6B6B6B',
  textoPlaceholder: '#9A9A9A',

  rosa: '#EC4B9C',
  rosaBotao: '#F37AB5',
  rosaBotaoPressionado: '#E5559C',
  rosaBotaoDesabilitado: '#F7B5D2',

  campoFundo: '#E8E6E6',
  campoBorda: '#DDDDDD',

  branco: '#FFFFFF',
  preto: '#000000',

  erro: '#D14343',
  sucesso: '#2E8B57',
} as const;

export type NomeCor = keyof typeof Cores;
