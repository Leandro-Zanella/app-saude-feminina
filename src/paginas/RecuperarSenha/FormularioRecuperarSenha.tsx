import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Botao, CampoTexto } from '@/src/componentes';
import { Espacamento } from '@/src/tema';
import type { PropriedadesFormularioRecuperarSenha } from '@/src/tipos';

export function FormularioRecuperarSenha({ aoEnviar, carregando = false, }: PropriedadesFormularioRecuperarSenha) {
  const [email, definirEmail] = useState('');
  const [erro, definirErro] = useState<string | undefined>(undefined);

  const validar = () => {
    if (!email.trim()) {
      definirErro('Informe seu e-mail.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      definirErro('E-mail inválido.');
      return false;
    }
    definirErro(undefined);
    return true;
  };

  const lidarComEnvio = async () => {
    if (!validar()) return;
    await aoEnviar({ email: email.trim() });
  };

  return (
    <View style={estilos.container}>
      <CampoTexto
        rotulo="E-mail"
        value={email}
        onChangeText={definirEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        textContentType="emailAddress"
        mensagemErro={erro}
      />

      <Botao titulo="Enviar link de recuperação" onPress={lidarComEnvio} carregando={carregando} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    gap: Espacamento.lg,
  },
});
