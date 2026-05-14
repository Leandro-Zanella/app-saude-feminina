import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@/src/componentes';
import { Cores, Espacamento } from '@/src/tema';
import type { PropriedadesLayoutAutenticacao } from '@/src/tipos';

export function LayoutAutenticacao({ children, rodape }: PropriedadesLayoutAutenticacao) {
  return (
    <SafeAreaView style={estilos.areaSegura} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={estilos.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={estilos.conteudoRolagem}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={estilos.cabecalho}>
            <Logo />
          </View>

          <View style={estilos.corpo}>{children}</View>

          {rodape ? <View style={estilos.rodape}>{rodape}</View> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  flex: {
    flex: 1,
  },
  conteudoRolagem: {
    flexGrow: 1,
    paddingHorizontal: Espacamento.xl,
    paddingVertical: Espacamento.xl,
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: Espacamento.xl,
    marginTop: Espacamento.lg,
  },
  corpo: {
    width: '100%',
  },
  rodape: {
    alignItems: 'center',
    marginTop: Espacamento.xl,
  },
});
