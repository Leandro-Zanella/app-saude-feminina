import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import type { Artigo } from './artigo';

export type PropriedadesLogo = {
  tamanhoIcone?: number;
};

export type PropriedadesCabecalhoLogado = {
  tamanhoIcone?: number;
};

export type PropriedadesTituloPagina = {
  titulo: string;
  subtitulo?: string;
};

export type PropriedadesBarraNavegacao = BottomTabBarProps & {
  aoPressionarBotaoCentral?: () => void;
};

export type PropriedadesCartao = {
  children: ReactNode;
  estiloAdicional?: StyleProp<ViewStyle>;
};

export type PropriedadesCampoTexto = TextInputProps & {
  rotulo: string;
  mensagemErro?: string;
};

export type PropriedadesBotao = Omit<PressableProps, 'style' | 'children'> & {
  titulo: string;
  carregando?: boolean;
  desabilitado?: boolean;
  estiloAdicional?: ViewStyle;
};

export type PropriedadesLinkTexto = Omit<PressableProps, 'children' | 'style'> & {
  texto: string;
  estiloTexto?: TextStyle;
};

export type PropriedadesLayoutAutenticacao = {
  children: ReactNode;
  rodape?: ReactNode;
};

export type PropriedadesCartaoArtigo = {
  artigo: Artigo;
  aoPressionar: () => void;
};

export type PropriedadesVisualizadorHtml = {
  html: string;
};
