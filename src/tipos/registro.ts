export type DadosRegistro = {
  nome: string;
  email: string;
  senha: string;
};

export type CamposRegistroComConfirmacao = keyof DadosRegistro | 'confirmarSenha';

export type ErrosRegistro = Partial<Record<CamposRegistroComConfirmacao, string>>;

export type PropriedadesFormularioRegistro = {
  aoEnviar: (dados: DadosRegistro) => void | Promise<void>;
  carregando?: boolean;
  erroGeral?: string;
};
