import type { DadosLogin } from './login';

export type Usuario = {
  id: string;
  nome: string;
  email: string;
};

export type ValorContextoUsuario = {
  usuario: Usuario | null;
  autenticado: boolean;
  carregando: boolean;
  entrar: (dados: DadosLogin) => Promise<void>;
  sair: () => void;
};
