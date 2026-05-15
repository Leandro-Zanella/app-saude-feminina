import { StyleSheet, Text, View } from 'react-native';
import { Cores, Espacamento, Tipografia } from '@/src/tema';
import type { PropriedadesTituloPagina } from '@/src/tipos';

export function TituloPagina({ titulo, subtitulo }: PropriedadesTituloPagina) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{titulo}</Text>
      {subtitulo ? <Text style={estilos.subtitulo}>{subtitulo}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Cores.fundo,
    paddingHorizontal: Espacamento.xl,
    gap: Espacamento.sm,
  },
  titulo: {
    ...Tipografia.tituloGrande,
    color: Cores.textoPrimario,
    textAlign: 'center',
  },
  subtitulo: {
    ...Tipografia.subtitulo,
    color: Cores.textoSecundario,
    textAlign: 'center',
  },
});
