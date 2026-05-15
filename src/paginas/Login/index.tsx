import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Cartao, LinkTexto } from '@/src/componentes';
import { useUsuario } from '@/src/contextos';
import { LayoutAutenticacao } from '@/src/paginas/_compartilhado/LayoutAutenticacao';
import { Cores, Espacamento, Tipografia } from '@/src/tema';
import type { DadosLogin } from '@/src/tipos';
import { FormularioLogin } from './FormularioLogin';

export function TelaLogin() {
  const roteador = useRouter();
  const { entrar, carregando } = useUsuario();
  const [erroGeral, definirErroGeral] = useState<string | undefined>(undefined);

  const aoEnviar = async (dados: DadosLogin) => {
    definirErroGeral(undefined);
    try {
      await entrar(dados);
      roteador.replace('/hoje');
    } catch (erro) {
      definirErroGeral(erro instanceof Error ? erro.message : 'Não foi possível entrar.');
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
          erroGeral={erroGeral}
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
