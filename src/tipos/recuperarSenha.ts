export type DadosRecuperarSenha = {
  email: string;
};

export type PropriedadesFormularioRecuperarSenha = {
  aoEnviar: (dados: DadosRecuperarSenha) => void | Promise<void>;
  carregando?: boolean;
};
