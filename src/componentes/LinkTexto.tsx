import { Pressable, StyleSheet, Text } from 'react-native';
import { Cores, Tipografia } from '@/src/tema';
import type { PropriedadesLinkTexto } from '@/src/tipos';

export function LinkTexto({ texto, estiloTexto, ...demaisPropriedades }: PropriedadesLinkTexto) {
  return (
    <Pressable
      {...demaisPropriedades}
      style={({ pressed }) => [estilos.areaToque, pressed && estilos.areaTocada]}
    >
      <Text style={[estilos.texto, estiloTexto]}>{texto}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  areaToque: {
    alignSelf: 'flex-start',
  },
  areaTocada: {
    opacity: 0.6,
  },
  texto: {
    ...Tipografia.link,
    color: Cores.rosa,
  },
});
