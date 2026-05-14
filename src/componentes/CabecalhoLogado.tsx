import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Cores, Espacamento, RaioBorda } from '@/src/tema';
import type { PropriedadesCabecalhoLogado } from '@/src/tipos';

export function CabecalhoLogado({ tamanhoIcone = 18 }: PropriedadesCabecalhoLogado) {
  return (
    <View style={estilos.container}>
      <View style={[estilos.circuloIcone, { width: tamanhoIcone * 2, height: tamanhoIcone * 2 }]}>
        <FontAwesome5 name="running" size={tamanhoIcone} color={Cores.branco} />
      </View>
      <View style={estilos.areaTexto}>
        <Text style={estilos.nomeMarca}>Flor</Text>
        <Text style={estilos.subtitulo}>Saúde & Bem-estar feminino</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamento.md,
    backgroundColor: Cores.branco,
    paddingHorizontal: Espacamento.lg,
    paddingVertical: Espacamento.md,
    borderBottomWidth: 1,
    borderBottomColor: Cores.bordaCartao,
  },
  circuloIcone: {
    backgroundColor: Cores.rosa,
    borderRadius: RaioBorda.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaTexto: {
    flex: 1,
  },
  nomeMarca: {
    fontSize: 18,
    fontWeight: '700',
    color: Cores.textoPrimario,
    lineHeight: 22,
  },
  subtitulo: {
    fontSize: 11,
    color: Cores.textoSecundario,
  },
});
