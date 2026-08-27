import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Cartao } from './Cartao';
import { Cores, Espacamento, Tipografia } from '@/src/tema';
import { formatarData } from '@/src/utilitarios';
import type { PropriedadesCartaoArtigo } from '@/src/tipos';

export function CartaoArtigo({ artigo, aoPressionar }: PropriedadesCartaoArtigo) {
  return (
    <Pressable onPress={aoPressionar}>
      {({ pressed }) => (
        <Cartao estiloAdicional={[estilos.cartao, pressed && estilos.cartaoPressionado]}>
          <Text style={estilos.titulo} numberOfLines={2}>
            {artigo.titulo}
          </Text>

          {artigo.resumo ? (
            <Text style={estilos.resumo} numberOfLines={2}>
              {artigo.resumo}
            </Text>
          ) : null}

          <View style={estilos.rodape}>
            <Text style={estilos.metadado}>{artigo.nomeAutor}</Text>
            <Text style={estilos.metadado}>{formatarData(artigo.atualizadoEm)}</Text>
          </View>
        </Cartao>
      )}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    padding: Espacamento.lg,
    gap: Espacamento.xs,
  },
  cartaoPressionado: {
    borderColor: Cores.rosa,
  },
  titulo: {
    ...Tipografia.tituloMedio,
    fontSize: 17,
    color: Cores.textoPrimario,
  },
  resumo: {
    ...Tipografia.corpo,
    color: Cores.textoSecundario,
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Espacamento.sm,
  },
  metadado: {
    ...Tipografia.rotulo,
    fontSize: 12,
    color: Cores.textoPlaceholder,
  },
});
