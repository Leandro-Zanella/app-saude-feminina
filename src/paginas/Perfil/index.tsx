import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Botao, Cartao } from '@/src/componentes';
import { useUsuario } from '@/src/contextos';
import { Cores, Espacamento, Tipografia } from '@/src/tema';

export function TelaPerfil() {
  const roteador = useRouter();
  const { usuario, sair } = useUsuario();

  const aoSair = async () => {
    await sair();
    roteador.replace('/login');
  };

  return (
    <View style={estilos.tela}>
      <Text style={estilos.titulo}>Perfil</Text>

      <Cartao estiloAdicional={estilos.cartao}>
        {usuario === null ? (
          <Text style={estilos.aviso}>Nenhuma sessão ativa.</Text>
        ) : (
          <>
            <Campo rotulo="Nome" valor={usuario.nome} />
            <Campo rotulo="E-mail" valor={usuario.email} />
            <Campo rotulo="Perfil de acesso" valor={usuario.papel} />
          </>
        )}
      </Cartao>

      <Botao titulo="Sair" onPress={aoSair} />
    </View>
  );
}

function Campo({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <Text style={estilos.valor}>{valor}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    padding: Espacamento.lg,
    gap: Espacamento.md,
  },
  titulo: {
    ...Tipografia.tituloGrande,
    fontSize: 26,
    color: Cores.textoPrimario,
  },
  cartao: {
    gap: Espacamento.lg,
  },
  rotulo: {
    ...Tipografia.rotulo,
    fontSize: 12,
    color: Cores.textoPlaceholder,
  },
  valor: {
    ...Tipografia.corpo,
    fontSize: 15,
    color: Cores.textoPrimario,
    marginTop: Espacamento.xs,
  },
  aviso: {
    ...Tipografia.corpo,
    color: Cores.textoSecundario,
  },
});
