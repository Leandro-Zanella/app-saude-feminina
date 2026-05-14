import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Cores, Espacamento, RaioBorda } from '@/src/tema';
import type { PropriedadesLogo } from '@/src/tipos';

export function Logo({ tamanhoIcone = 36 }: PropriedadesLogo) {
  return (
    <View style={estilos.container}>
      <View style={[estilos.circuloIcone, { width: tamanhoIcone * 2, height: tamanhoIcone * 2 }]}>
        <FontAwesome5 name="running" size={tamanhoIcone} color={Cores.branco} />
      </View>
      <Text style={estilos.nomeMarca}>Flor</Text>
      <Text style={estilos.subtitulo}>Saúde & Bem-estar feminino</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Espacamento.xs,
  },
  circuloIcone: {
    backgroundColor: Cores.rosa,
    borderRadius: RaioBorda.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Espacamento.sm,
  },
  nomeMarca: {
    fontSize: 32,
    fontWeight: '700',
    color: Cores.textoPrimario,
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 13,
    color: Cores.textoSecundario,
  },
});
