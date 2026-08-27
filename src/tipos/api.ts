export type PapelUsuario = 'USER' | 'ADMIN';

export type CorpoLogin = {
  email: string;
  password: string;
};

export type RespostaLogin = {
  user: RespostaUsuario;
  token: string;
};

export type CorpoRegistro = {
  name: string;
  email: string;
  password: string;
  userRole: PapelUsuario;
};

export type RespostaUsuario = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export type RespostaArtigo = {
  id: number;
  title: string;
  summary: string | null;
  contentHtml: string;
  coverImageUrl: string | null;
  authorName: string;
  createdAt: string;
  updatedAt: string;
};

export type ErrosPorCampo = Record<string, string>;
