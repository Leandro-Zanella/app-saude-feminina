import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Cartao, LinkTexto } from '@/src/componentes';
import { useUsuario } from '@/src/contextos';
import { LayoutAutenticacao } from '@/src/paginas/_compartilhado/LayoutAutenticacao';
import { Cores, Espacamento, Tipografia } from '@/src/tema';
import type { DadosRegistro } from '@/src/tipos';
import { FormularioRegistro } from './FormularioRegistro';

export function TelaRegistro() {
  const roteador = useRouter();
  const { cadastrar, carregando } = useUsuario();
  const [erroGeral, definirErroGeral] = useState<string | undefined>(undefined);

  const aoEnviar = async (dados: DadosRegistro) => {
    definirErroGeral(undefined);
    try {
      await cadastrar(dados);
      roteador.replace('/hoje');
    } catch (erro) {
      definirErroGeral(erro instanceof Error ? erro.message : 'Não foi possível criar sua conta.');
    }
  };

  return (
    <LayoutAutenticacao
      rodape={
        <View style={estilos.linhaRodape}>
          <Text style={estilos.textoRodape}>Já tem uma conta? </Text>
          <LinkTexto texto="Faça login" onPress={() => roteador.back()} />
        </View>
      }
    >
      <Cartao>
        <View style={estilos.cabecalhoCartao}>
          <Text style={estilos.titulo}>Crie sua conta</Text>
          <Text style={estilos.subtitulo}>Comece a cuidar da sua saúde hoje</Text>
        </View>

        <FormularioRegistro aoEnviar={aoEnviar} carregando={carregando} erroGeral={erroGeral} />
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
