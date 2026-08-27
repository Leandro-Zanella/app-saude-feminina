import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Botao, CartaoArtigo } from '@/src/componentes';
import { listarArtigos } from '@/src/servicos';
import { Cores, Espacamento, Tipografia } from '@/src/tema';
import type { Artigo } from '@/src/tipos';

export function TelaConteudos() {
  const roteador = useRouter();
  const [artigos, definirArtigos] = useState<Artigo[]>([]);
  const [carregandoPrimeiraVez, definirCarregandoPrimeiraVez] = useState(true);
  const [atualizando, definirAtualizando] = useState(false);
  const [erro, definirErro] = useState<string | null>(null);

  const buscar = useCallback(async () => {
    definirErro(null);
    try {
      definirArtigos(await listarArtigos());
    } catch (problema) {
      definirErro(
        problema instanceof Error ? problema.message : 'Não foi possível carregar os artigos.',
      );
    } finally {
      definirCarregandoPrimeiraVez(false);
      definirAtualizando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      buscar();
    }, [buscar]),
  );

  const aoPuxarParaAtualizar = useCallback(() => {
    definirAtualizando(true);
    buscar();
  }, [buscar]);

  if (carregandoPrimeiraVez) {
    return (
      <View style={estilos.centralizado}>
        <ActivityIndicator color={Cores.rosa} size="large" />
      </View>
    );
  }

  if (erro && artigos.length === 0) {
    return (
      <View style={estilos.centralizado}>
        <Text style={estilos.tituloAviso}>Não deu para carregar</Text>
        <Text style={estilos.textoAviso}>{erro}</Text>
        <Botao titulo="Tentar de novo" onPress={buscar} estiloAdicional={estilos.botaoAviso} />
      </View>
    );
  }

  return (
    <FlatList
      data={artigos}
      keyExtractor={(artigo) => String(artigo.id)}
      contentContainerStyle={estilos.lista}
      refreshControl={
        <RefreshControl
          refreshing={atualizando}
          onRefresh={aoPuxarParaAtualizar}
          tintColor={Cores.rosa}
          colors={[Cores.rosa]}
        />
      }
      ListHeaderComponent={
        <View style={estilos.cabecalho}>
          <Text style={estilos.titulo}>Conteúdos</Text>
          <Text style={estilos.subtitulo}>
            {artigos.length === 1 ? '1 artigo disponível' : `${artigos.length} artigos disponíveis`}
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={estilos.centralizado}>
          <Text style={estilos.tituloAviso}>Nenhum artigo ainda</Text>
          <Text style={estilos.textoAviso}>
            Publique um artigo na gestão web e puxe para atualizar.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <CartaoArtigo artigo={item} aoPressionar={() => roteador.push(`/conteudos/${item.id}`)} />
      )}
    />
  );
}

const estilos = StyleSheet.create({
  lista: {
    padding: Espacamento.lg,
    gap: Espacamento.md,
    flexGrow: 1,
  },
  cabecalho: {
    marginBottom: Espacamento.xs,
  },
  titulo: {
    ...Tipografia.tituloGrande,
    fontSize: 26,
    color: Cores.textoPrimario,
  },
  subtitulo: {
    ...Tipografia.subtitulo,
    color: Cores.textoSecundario,
    marginTop: Espacamento.xs,
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
