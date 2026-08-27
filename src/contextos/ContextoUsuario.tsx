import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { autenticar, encerrarSessao, registrar, restaurarSessao } from '@/src/servicos';
import type { DadosLogin, DadosRegistro, Usuario, ValorContextoUsuario } from '@/src/tipos';

const ContextoUsuario = createContext<ValorContextoUsuario | null>(null);

type PropriedadesProvedorUsuario = {
  children: ReactNode;
};

export function ProvedorUsuario({ children }: PropriedadesProvedorUsuario) {
  const [usuario, definirUsuario] = useState<Usuario | null>(null);
  const [token, definirToken] = useState<string | null>(null);
  const [carregando, definirCarregando] = useState(false);
  const [restaurando, definirRestaurando] = useState(true);

  useEffect(() => {
    restaurarSessao()
      .then((sessao) => {
        if (sessao === null) {
          return;
        }
        definirUsuario(sessao.usuario);
        definirToken(sessao.token);
      })
      .finally(() => definirRestaurando(false));
  }, []);

  const entrar = useCallback(async (dados: DadosLogin) => {
    definirCarregando(true);
    try {
      const sessao = await autenticar(dados);
      definirUsuario(sessao.usuario);
      definirToken(sessao.token);
    } finally {
      definirCarregando(false);
    }
  }, []);

  const cadastrar = useCallback(async (dados: DadosRegistro) => {
    definirCarregando(true);
    try {
      await registrar(dados);
      const sessao = await autenticar({ email: dados.email, senha: dados.senha });
      definirUsuario(sessao.usuario);
      definirToken(sessao.token);
    } finally {
      definirCarregando(false);
    }
  }, []);

  const sair = useCallback(async () => {
    await encerrarSessao();
    definirUsuario(null);
    definirToken(null);
  }, []);

  const valor = useMemo<ValorContextoUsuario>(
    () => ({
      usuario,
      token,
      autenticado: usuario !== null,
      carregando,
      restaurando,
      entrar,
      cadastrar,
      sair,
    }),
    [usuario, token, carregando, restaurando, entrar, cadastrar, sair],
  );

  return <ContextoUsuario.Provider value={valor}>{children}</ContextoUsuario.Provider>;
}

export function useUsuario(): ValorContextoUsuario {
  const valor = useContext(ContextoUsuario);
  if (!valor) {
    throw new Error('useUsuario precisa ser usado dentro de um <ProvedorUsuario>.');
  }
  return valor;
}
