import { requisitar } from './clienteHttp';
import { guardarSessao, limparSessao } from './sessao';
import type {
  CorpoLogin,
  CorpoRegistro,
  DadosLogin,
  DadosRegistro,
  PapelUsuario,
  RespostaLogin,
  RespostaUsuario,
  SessaoAutenticada,
  Usuario,
} from '@/src/tipos';

const PAPEL_DO_APP: PapelUsuario = 'USER';

export async function autenticar({ email, senha }: DadosLogin): Promise<SessaoAutenticada> {
  const corpo: CorpoLogin = { email, password: senha };

  const resposta = await requisitar<RespostaLogin>('/api/user/login', {
    metodo: 'POST',
    autenticado: false,
    corpo,
  });

  const sessao: SessaoAutenticada = {
    usuario: paraUsuario(resposta.user),
    token: resposta.token,
  };

  await guardarSessao(sessao);

  return sessao;
}

export async function registrar({ nome, email, senha }: DadosRegistro): Promise<Usuario> {
  const corpo: CorpoRegistro = {
    name: nome,
    email,
    password: senha,
    userRole: PAPEL_DO_APP,
  };

  const resposta = await requisitar<RespostaUsuario>('/api/user/register', {
    metodo: 'POST',
    autenticado: false,
    corpo,
  });

  return paraUsuario(resposta);
}

export async function encerrarSessao(): Promise<void> {
  await limparSessao();
}

function paraUsuario(resposta: RespostaUsuario): Usuario {
  return {
    id: resposta.id,
    nome: resposta.name,
    email: resposta.email,
    papel: resposta.role,
  };
}
