import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Botao, CampoTexto, LinkTexto } from '@/src/componentes';
import { Espacamento } from '@/src/tema';
import type { ErrosLogin, PropriedadesFormularioLogin } from '@/src/tipos';

export function FormularioLogin({ aoEnviar, aoClicarEsqueciSenha, carregando = false, }: PropriedadesFormularioLogin) {
  const [email, definirEmail] = useState('');
  const [senha, definirSenha] = useState('');
  const [erros, definirErros] = useState<ErrosLogin>({});

  const validar = () => {
    const novosErros: ErrosLogin = {};
    if (!email.trim()) {
      novosErros.email = 'Informe seu e-mail.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      novosErros.email = 'E-mail inválido.';
    }
    if (!senha) {
      novosErros.senha = 'Informe sua senha.';
    }
    definirErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const lidarComEnvio = async () => {
    if (!validar()) return;
    await aoEnviar({ email: email.trim(), senha });
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
        mensagemErro={erros.email}
      />

      <CampoTexto
        rotulo="Senha"
        value={senha}
        onChangeText={definirSenha}
        secureTextEntry
        autoComplete="password"
        textContentType="password"
        mensagemErro={erros.senha}
      />

      <View style={estilos.linhaEsqueciSenha}>
        <LinkTexto texto="Esqueci minha senha" onPress={aoClicarEsqueciSenha} />
      </View>

      <Botao titulo="Entrar" onPress={lidarComEnvio} carregando={carregando} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    gap: Espacamento.lg,
  },
  linhaEsqueciSenha: {
    alignItems: 'flex-end',
  },
});
