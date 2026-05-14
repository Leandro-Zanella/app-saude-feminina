export type DadosLogin = {
  email: string;
  senha: string;
};

export type ErrosLogin = Partial<Record<keyof DadosLogin, string>>;

export type PropriedadesFormularioLogin = {
  aoEnviar: (dados: DadosLogin) => void | Promise<void>;
  aoClicarEsqueciSenha: () => void;
  carregando?: boolean;
};
