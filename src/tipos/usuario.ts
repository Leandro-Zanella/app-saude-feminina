import type { DadosLogin } from './login';
import type { DadosRegistro } from './registro';

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  papel: string;
};

export type ValorContextoUsuario = {
  usuario: Usuario | null;
  token: string | null;
  autenticado: boolean;
  carregando: boolean;
  entrar: (dados: DadosLogin) => Promise<void>;
  cadastrar: (dados: DadosRegistro) => Promise<void>;
  sair: () => void;
};
