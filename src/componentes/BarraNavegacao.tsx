import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Cores, Espacamento, RaioBorda } from '@/src/tema';
import type { PropriedadesBarraNavegacao } from '@/src/tipos';

type IconeIonicons = keyof typeof Ionicons.glyphMap;

const ICONES_POR_ROTA: Record<string, { ativo: IconeIonicons; inativo: IconeIonicons }> = {
  hoje: { ativo: 'home', inativo: 'home-outline' },
  ciclo: { ativo: 'heart', inativo: 'heart-outline' },
  conteudos: { ativo: 'book', inativo: 'book-outline' },
  perfil: { ativo: 'person', inativo: 'person-outline' },
};

const ROTULOS_POR_ROTA: Record<string, string> = {
  hoje: 'Hoje',
  ciclo: 'Ciclo',
  conteudos: 'Conteúdos',
  perfil: 'Perfil',
};

export function BarraNavegacao({
  state,
  navigation,
  aoPressionarBotaoCentral,
}: PropriedadesBarraNavegacao) {
  const insets = useSafeAreaInsets();

  const rotasEsquerda = state.routes.slice(0, 2);
  const rotasDireita = state.routes.slice(2);

  const renderizarItem = (rota: (typeof state.routes)[number], indiceReal: number) => {
    const focado = state.index === indiceReal;
    const icones = ICONES_POR_ROTA[rota.name];
    const rotulo = ROTULOS_POR_ROTA[rota.name] ?? rota.name;

    const aoPressionar = () => {
      const evento = navigation.emit({
        type: 'tabPress',
        target: rota.key,
        canPreventDefault: true,
      });
      if (!focado && !evento.defaultPrevented) {
        navigation.navigate(rota.name, rota.params);
      }
    };

    return (
      <Pressable
        key={rota.key}
        onPress={aoPressionar}
        style={estilos.itemTab}
        accessibilityRole="button"
        accessibilityState={focado ? { selected: true } : {}}
      >
        <Ionicons
          name={focado ? icones?.ativo ?? 'ellipse' : icones?.inativo ?? 'ellipse-outline'}
          size={22}
          color={focado ? Cores.rosa : Cores.textoSecundario}
        />
        <Text style={[estilos.rotuloTab, focado && estilos.rotuloTabAtivo]}>{rotulo}</Text>
      </Pressable>
    );
  };

  return (
    <View style={[estilos.container, { paddingBottom: Math.max(insets.bottom, Espacamento.sm) }]}>
      <View style={estilos.linhaTabs}>
        <View style={estilos.grupoTabs}>
          {rotasEsquerda.map((rota, indice) => renderizarItem(rota, indice))}
        </View>

        <View style={estilos.espacoBotaoCentral} />

        <View style={estilos.grupoTabs}>
          {rotasDireita.map((rota, indice) => renderizarItem(rota, indice + 2))}
        </View>
      </View>

      <Pressable
        onPress={aoPressionarBotaoCentral}
        style={({ pressed }) => [
          estilos.botaoCentral,
          { bottom: Math.max(insets.bottom, Espacamento.sm) + 18 },
          pressed && estilos.botaoCentralPressionado,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Adicionar"
      >
        <Ionicons name="add" size={28} color={Cores.branco} />
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    backgroundColor: Cores.branco,
    borderTopWidth: 1,
    borderTopColor: Cores.bordaCartao,
  },
  linhaTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Espacamento.sm,
  },
  grupoTabs: {
    flex: 1,
    flexDirection: 'row',
  },
  espacoBotaoCentral: {
    width: 72,
  },
  itemTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: Espacamento.xs,
  },
  rotuloTab: {
    fontSize: 11,
    color: Cores.textoSecundario,
  },
  rotuloTabAtivo: {
    color: Cores.rosa,
    fontWeight: '600',
  },
  botaoCentral: {
    position: 'absolute',
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: RaioBorda.md,
    backgroundColor: Cores.rosaBotao,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Cores.preto,
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  botaoCentralPressionado: {
    backgroundColor: Cores.rosaBotaoPressionado,
  },
});
