import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Cartao, LinkTexto } from '@/src/componentes';
import { LayoutAutenticacao } from '@/src/paginas/_compartilhado/LayoutAutenticacao';
import { Cores, Espacamento, Tipografia } from '@/src/tema';
import type { DadosRecuperarSenha } from '@/src/tipos';
import { FormularioRecuperarSenha } from './FormularioRecuperarSenha';

export function TelaRecuperarSenha() {
  const roteador = useRouter();
  const [carregando, definirCarregando] = useState(false);

  const aoEnviar = async ({ email }: DadosRecuperarSenha) => {
    definirCarregando(true);
    try {
      console.log('Recuperação de senha:', email);
    } finally {
      definirCarregando(false);
    }
  };

  return (
    <LayoutAutenticacao>
      <Cartao>
        <View style={estilos.cabecalhoCartao}>
          <Text style={estilos.titulo}>Esqueceu a senha?</Text>
          <Text style={estilos.subtitulo}>
            Informe seu e-mail e enviaremos um link para redefinir sua senha
          </Text>
        </View>

        <FormularioRecuperarSenha aoEnviar={aoEnviar} carregando={carregando} />

        <View style={estilos.areaVoltar}>
          <LinkTexto
            texto="← Voltar ao login"
            onPress={() => roteador.back()}
            estiloTexto={estilos.textoVoltar}
          />
        </View>
      </Cartao>
    </LayoutAutenticacao>
  );
}

const estilos = StyleSheet.create({
  cabecalhoCartao: {
    marginBottom: Espacamento.lg,
  },
  titulo: {
    ...Tipografia.tituloMedio,
    color: Cores.textoPrimario,
  },
  subtitulo: {
    ...Tipografia.subtitulo,
    color: Cores.textoSecundario,
    marginTop: Espacamento.xs,
  },
  areaVoltar: {
    alignItems: 'center',
    marginTop: Espacamento.lg,
  },
  textoVoltar: {
    color: Cores.textoPrimario,
    fontWeight: '500',
  },
});
