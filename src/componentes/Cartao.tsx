import { StyleSheet, View } from 'react-native';
import { Cores, Espacamento, RaioBorda } from '@/src/tema';
import type { PropriedadesCartao } from '@/src/tipos';

export function Cartao({ children, estiloAdicional }: PropriedadesCartao) {
  return <View style={[estilos.cartao, estiloAdicional]}>{children}</View>;
}

const estilos = StyleSheet.create({
  cartao: {
    backgroundColor: Cores.cartao,
    borderRadius: RaioBorda.lg,
    borderWidth: 1,
    borderColor: Cores.bordaCartao,
    padding: Espacamento.xl,
    width: '100%',
  },
});
