import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Cores, Espacamento, RaioBorda, Tipografia } from '@/src/tema';
import type { PropriedadesCampoTexto } from '@/src/tipos';

export function CampoTexto({
  rotulo,
  mensagemErro,
  style,
  onFocus,
  onBlur,
  ...demaisPropriedades
}: PropriedadesCampoTexto) {
  const [focado, definirFocado] = useState(false);
  const temErro = Boolean(mensagemErro);

  return (
    <View style={estilos.container}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <TextInput
        {...demaisPropriedades}
        placeholderTextColor={Cores.textoPlaceholder}
        onFocus={(evento) => {
          definirFocado(true);
          onFocus?.(evento);
        }}
        onBlur={(evento) => {
          definirFocado(false);
          onBlur?.(evento);
        }}
        style={[
          estilos.entrada,
          focado && estilos.entradaFocada,
          temErro && estilos.entradaComErro,
          style,
        ]}
      />
      {temErro && <Text style={estilos.mensagemErro}>{mensagemErro}</Text>}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    gap: Espacamento.xs,
  },
  rotulo: {
    ...Tipografia.rotulo,
    color: Cores.textoPrimario,
  },
  entrada: {
    backgroundColor: Cores.campoFundo,
    borderRadius: RaioBorda.md,
    paddingHorizontal: Espacamento.lg,
    paddingVertical: Espacamento.md,
    fontSize: 14,
    color: Cores.textoPrimario,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  entradaFocada: {
    borderColor: Cores.rosa,
  },
  entradaComErro: {
    borderColor: Cores.erro,
  },
  mensagemErro: {
    fontSize: 12,
    color: Cores.erro,
    marginTop: Espacamento.xs,
  },
});
