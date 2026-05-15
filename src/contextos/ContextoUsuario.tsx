import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import type { DadosLogin, Usuario, ValorContextoUsuario } from '@/src/tipos';

const USUARIO_MOCK = {
  email: 'teste@teste.com',
  senha: '123123',
  dados: {
    id: '1',
    nome: 'Maria Silva',
    email: 'teste@teste.com',
  } satisfies Usuario,
};

const ContextoUsuario = createContext<ValorContextoUsuario | null>(null);

type PropriedadesProvedorUsuario = {
  children: ReactNode;
};

export function ProvedorUsuario({ children }: PropriedadesProvedorUsuario) {
  const [usuario, definirUsuario] = useState<Usuario | null>(null);
  const [carregando, definirCarregando] = useState(false);

  const entrar = useCallback(async ({ email, senha }: DadosLogin) => {
    definirCarregando(true);
    try {
      await new Promise((resolver) => setTimeout(resolver, 400));

      if (email === USUARIO_MOCK.email && senha === USUARIO_MOCK.senha) {
        definirUsuario(USUARIO_MOCK.dados);
        return;
      }

      throw new Error('E-mail ou senha incorretos.');
    } finally {
      definirCarregando(false);
    }
  }, []);

  const sair = useCallback(() => {
    definirUsuario(null);
  }, []);

  const valor = useMemo<ValorContextoUsuario>(
    () => ({
      usuario,
      autenticado: usuario !== null,
      carregando,
      entrar,
      sair,
    }),
    [usuario, carregando, entrar, sair],
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
