import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Botao, CampoTexto } from '@/src/componentes';
import { Espacamento } from '@/src/tema';
import type { ErrosRegistro, PropriedadesFormularioRegistro } from '@/src/tipos';

export function FormularioRegistro({ aoEnviar, carregando = false, }: PropriedadesFormularioRegistro) {
  const [nome, definirNome] = useState('');
  const [email, definirEmail] = useState('');
  const [senha, definirSenha] = useState('');
  const [confirmarSenha, definirConfirmarSenha] = useState('');
  const [erros, definirErros] = useState<ErrosRegistro>({});

  const validar = () => {
    const novosErros: ErrosRegistro = {};

    if (!nome.trim()) {
      novosErros.nome = 'Informe seu nome.';
    } else if (nome.trim().length < 2) {
      novosErros.nome = 'Nome muito curto.';
    }

    if (!email.trim()) {
      novosErros.email = 'Informe seu e-mail.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      novosErros.email = 'E-mail inválido.';
    }

    if (!senha) {
      novosErros.senha = 'Informe uma senha.';
    } else if (senha.length < 6) {
      novosErros.senha = 'A senha deve ter ao menos 6 caracteres.';
    }

    if (!confirmarSenha) {
      novosErros.confirmarSenha = 'Confirme sua senha.';
    } else if (senha !== confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem.';
    }

    definirErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const lidarComEnvio = async () => {
    if (!validar()) return;
    await aoEnviar({ nome: nome.trim(), email: email.trim(), senha });
  };

  return (
    <View style={estilos.container}>
      <CampoTexto
        rotulo="Nome"
        value={nome}
        onChangeText={definirNome}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
        mensagemErro={erros.nome}
      />

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
        autoComplete="new-password"
        textContentType="newPassword"
        mensagemErro={erros.senha}
      />

      <CampoTexto
        rotulo="Confirmar senha"
        value={confirmarSenha}
        onChangeText={definirConfirmarSenha}
        secureTextEntry
        autoComplete="new-password"
        textContentType="newPassword"
        mensagemErro={erros.confirmarSenha}
      />

      <Botao titulo="Criar conta" onPress={lidarComEnvio} carregando={carregando} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    gap: Espacamento.lg,
  },
});
