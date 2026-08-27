import type { Usuario } from './usuario';

export type SessaoAutenticada = {
  usuario: Usuario;
  token: string;
};
