import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { Cores, Espacamento, RaioBorda, Tipografia } from '@/src/tema';
import type { PropriedadesBotao } from '@/src/tipos';

export function Botao({
  titulo,
  carregando = false,
  desabilitado = false,
  estiloAdicional,
  ...demaisPropriedades
}: PropriedadesBotao) {
  const inativo = desabilitado || carregando;

  return (
    <Pressable
      {...demaisPropriedades}
      disabled={inativo}
      style={({ pressed }) => [
        estilos.botao,
        pressed && !inativo && estilos.botaoPressionado,
        inativo && estilos.botaoDesabilitado,
        estiloAdicional,
      ]}
    >
      {carregando ? (
        <ActivityIndicator color={Cores.branco} />
      ) : (
        <Text style={estilos.tituloBotao}>{titulo}</Text>
      )}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    backgroundColor: Cores.rosaBotao,
    borderRadius: RaioBorda.md,
    paddingVertical: Espacamento.md + 2,
    paddingHorizontal: Espacamento.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  botaoPressionado: {
    backgroundColor: Cores.rosaBotaoPressionado,
  },
  botaoDesabilitado: {
    backgroundColor: Cores.rosaBotaoDesabilitado,
  },
  tituloBotao: {
    ...Tipografia.botao,
    color: Cores.branco,
  },
});
