import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Botao, VisualizadorHtml } from '@/src/componentes';
import { obterArtigo } from '@/src/servicos';
import { Cores, Espacamento, RaioBorda, Tipografia } from '@/src/tema';
import { formatarData } from '@/src/utilitarios';
import type { Artigo, PropriedadesTelaArtigo } from '@/src/tipos';

export function TelaArtigo({ id }: PropriedadesTelaArtigo) {
  const roteador = useRouter();
  const [artigo, definirArtigo] = useState<Artigo | null>(null);
  const [carregando, definirCarregando] = useState(true);
  const [erro, definirErro] = useState<string | null>(null);

  const buscar = useCallback(async () => {
    definirErro(null);
    try {
      definirArtigo(await obterArtigo(id));
    } catch (problema) {
      definirErro(
        problema instanceof Error ? problema.message : 'Não foi possível carregar o artigo.',
      );
    } finally {
      definirCarregando(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      buscar();
    }, [buscar]),
  );

  return (
    <View style={estilos.tela}>
      <Pressable onPress={() => roteador.back()} style={estilos.botaoVoltar} hitSlop={8}>
        <Ionicons name="chevron-back" size={20} color={Cores.rosa} />
        <Text style={estilos.textoVoltar}>Conteúdos</Text>
      </Pressable>

      {carregando ? (
        <View style={estilos.centralizado}>
          <ActivityIndicator color={Cores.rosa} size="large" />
        </View>
      ) : erro || !artigo ? (
        <View style={estilos.centralizado}>
          <Text style={estilos.tituloAviso}>Artigo indisponível</Text>
          <Text style={estilos.textoAviso}>{erro ?? 'Este artigo não existe mais.'}</Text>
          <Botao
            titulo="Voltar para a lista"
            onPress={() => roteador.back()}
            estiloAdicional={estilos.botaoAviso}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={estilos.conteudo}>
          {artigo.urlCapa ? (
            <Image source={artigo.urlCapa} style={estilos.capa} contentFit="cover" transition={200} />
          ) : null}

          <Text style={estilos.titulo}>{artigo.titulo}</Text>

          <Text style={estilos.metadados}>
            {artigo.nomeAutor} · atualizado em {formatarData(artigo.atualizadoEm)}
          </Text>

          {artigo.resumo ? <Text style={estilos.resumo}>{artigo.resumo}</Text> : null}

          <View style={estilos.corpoHtml}>
            <VisualizadorHtml html={artigo.conteudoHtml} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamento.xs,
    paddingHorizontal: Espacamento.lg,
    paddingVertical: Espacamento.md,
  },
  textoVoltar: {
    ...Tipografia.link,
    color: Cores.rosa,
  },
  conteudo: {
    padding: Espacamento.lg,
    paddingTop: 0,
    gap: Espacamento.sm,
  },
  capa: {
    width: '100%',
    height: 180,
    borderRadius: RaioBorda.lg,
    backgroundColor: Cores.campoFundo,
    marginBottom: Espacamento.sm,
  },
  titulo: {
    ...Tipografia.tituloGrande,
    fontSize: 26,
    color: Cores.textoPrimario,
  },
  metadados: {
    ...Tipografia.rotulo,
    fontSize: 12,
    color: Cores.textoPlaceholder,
  },
  resumo: {
    ...Tipografia.corpo,
    fontSize: 15,
    color: Cores.textoSecundario,
    marginTop: Espacamento.xs,
  },
  corpoHtml: {
    backgroundColor: Cores.cartao,
    borderRadius: RaioBorda.lg,
    borderWidth: 1,
    borderColor: Cores.bordaCartao,
    padding: Espacamento.lg,
    marginTop: Espacamento.sm,
    overflow: 'hidden',
  },
  centralizado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Espacamento.xl,
    gap: Espacamento.sm,
  },
  tituloAviso: {
    ...Tipografia.tituloMedio,
    color: Cores.textoPrimario,
    textAlign: 'center',
  },
  textoAviso: {
    ...Tipografia.corpo,
    color: Cores.textoSecundario,
    textAlign: 'center',
  },
  botaoAviso: {
    marginTop: Espacamento.md,
  },
});
