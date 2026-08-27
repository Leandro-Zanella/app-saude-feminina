import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarraNavegacao, CabecalhoLogado } from '@/src/componentes';
import { useUsuario } from '@/src/contextos';
import { Cores } from '@/src/tema';

export default function LayoutTabs() {
  const { autenticado, restaurando } = useUsuario();

  const aoPressionarBotaoCentral = () => {
    // TODO: abrir modal de adicionar registro (sintoma, humor, etc.)
    console.log('Botão central pressionado');
  };

  if (restaurando) {
    return (
      <View style={estilos.carregando}>
        <ActivityIndicator color={Cores.rosa} size="large" />
      </View>
    );
  }

  if (!autenticado) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView style={estilos.areaSegura} edges={['top']}>
      <CabecalhoLogado />
      <View style={estilos.areaConteudo}>
        <Tabs
          screenOptions={{ headerShown: false }}
          tabBar={(propriedadesTabBar) => (
            <BarraNavegacao
              {...propriedadesTabBar}
              aoPressionarBotaoCentral={aoPressionarBotaoCentral}
            />
          )}
        >
          <Tabs.Screen name="hoje" options={{ title: 'Hoje' }} />
          <Tabs.Screen name="ciclo" options={{ title: 'Ciclo' }} />
          <Tabs.Screen name="conteudos" options={{ title: 'Conteúdos' }} />
          <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
        </Tabs>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: Cores.branco,
  },
  areaConteudo: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  carregando: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Cores.fundo,
  },
});
