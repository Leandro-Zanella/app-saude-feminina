import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Cartao, LinkTexto } from '@/src/componentes';
import { LayoutAutenticacao } from '@/src/paginas/_compartilhado/LayoutAutenticacao';
import { Cores, Espacamento, Tipografia } from '@/src/tema';
import type { DadosLogin } from '@/src/tipos';
import { FormularioLogin } from './FormularioLogin';

export function TelaLogin() {
  const roteador = useRouter();
  const [carregando, definirCarregando] = useState(false);

  const aoEnviar = async ({ email, senha }: DadosLogin) => {
    definirCarregando(true);
    try {
      console.log('Login:', email, senha);
      roteador.replace('/hoje');
    } finally {
      definirCarregando(false);
    }
  };

  return (
    <LayoutAutenticacao
      rodape={
        <View style={estilos.linhaRodape}>
          <Text style={estilos.textoRodape}>Não tem conta? </Text>
          <LinkTexto texto="Cadastre-se" onPress={() => roteador.push('/registro')} />
        </View>
      }
    >
      <Cartao>
        <View style={estilos.cabecalhoCartao}>
          <Text style={estilos.titulo}>Boas vindas de volta</Text>
          <Text style={estilos.subtitulo}>Entre na sua conta para continuar</Text>
        </View>

        <FormularioLogin
          aoEnviar={aoEnviar}
          aoClicarEsqueciSenha={() => roteador.push('/recuperar-senha')}
          carregando={carregando}
        />
      </Cartao>
    </LayoutAutenticacao>
  );
}

const estilos = StyleSheet.create({
  cabecalhoCartao: {
    marginBottom: Espacamento.lg,
  },
  titulo: {
    ...Tipografia.tituloMedio,
    color: Cores.textoPrimario,
  },
  subtitulo: {
    ...Tipografia.subtitulo,
    color: Cores.textoSecundario,
    marginTop: Espacamento.xs,
  },
  linhaRodape: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoRodape: {
    ...Tipografia.corpo,
    color: Cores.textoPrimario,
  },
});
