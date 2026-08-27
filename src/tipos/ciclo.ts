export type RegistroCiclo = {
  id: string;
  inicio: string;
  fim: string | null;
};

export type DadosCiclo = {
  inicio: string;
  fim: string | null;
};

export type PrevisaoCiclo = {
  proximoInicio: string;
  proximoFim: string;
  duracaoMediaDias: number;
  cicloMedioDias: number;
  diasParaProximo: number;
  historicoSuficiente: boolean;
};

export type MarcacaoDia = {
  color: string;
  textColor: string;
  startingDay: boolean;
  endingDay: boolean;
};
