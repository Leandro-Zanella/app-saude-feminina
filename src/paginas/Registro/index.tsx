import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Cartao, LinkTexto } from '@/src/componentes';
import { LayoutAutenticacao } from '@/src/paginas/_compartilhado/LayoutAutenticacao';
import { Cores, Espacamento, Tipografia } from '@/src/tema';
import type { DadosRegistro } from '@/src/tipos';
import { FormularioRegistro } from './FormularioRegistro';

export function TelaRegistro() {
  const roteador = useRouter();
  const [carregando, definirCarregando] = useState(false);

  const aoEnviar = async (dados: DadosRegistro) => {
    definirCarregando(true);
    try {
      console.log('Cadastro:', dados);
    } finally {
      definirCarregando(false);
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

        <FormularioRegistro aoEnviar={aoEnviar} carregando={carregando} />
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
