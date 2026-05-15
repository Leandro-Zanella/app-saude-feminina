# Flor — App de Saúde & Bem-estar Feminino

Aplicativo mobile para acompanhamento do ciclo menstrual, sintomas, conteúdos
educativos e bem-estar feminino. Construído em **React Native + Expo Router**
com TypeScript estrito e convenções em português.

> Status: em desenvolvimento. Login mockado, telas de autenticação prontas e
> esqueleto da área logada (tabs) com placeholders.

---

## Stack

- **React Native 0.81** + **React 19** (New Architecture habilitada)
- **Expo SDK 54** com **expo-router 6** (file-based routing)
- **TypeScript 5.9** em modo `strict`
- **@react-navigation** (bottom-tabs, native, elements)
- **@expo/vector-icons** (FontAwesome5 + Ionicons)
- **react-native-safe-area-context** + **react-native-gesture-handler**
- **ESLint** com `eslint-config-expo`

---

## Como rodar

Requisitos: Node 18+, npm e (para device físico) o app **Expo Go** ou um
emulador Android/iOS configurado.

```bash
npm install        # instala dependências
npm start          # inicia o Metro bundler

# Atalhos específicos:
npm run android    # build/run no Android
npm run ios        # build/run no iOS (macOS)
npm run web        # versão web
npm run lint       # ESLint via Expo
```

### Credenciais de teste (mock)

A autenticação está **mockada**. Use:

```
e-mail: teste@teste.com
senha:  123123
```

Qualquer outra combinação retorna `"E-mail ou senha incorretos."`.

---

## Estrutura do projeto

A pasta `app/` contém apenas as **rotas** (Expo Router resolve pelo nome dos
arquivos). Toda a lógica, UI e tipos vivem em `src/`, organizados por
responsabilidade.

```text
app/                              # rotas (file-based)
├── _layout.tsx                   # raiz: SafeAreaProvider + ProvedorUsuario + Stack
├── index.tsx                     # Redirect inicial → /login
├── (auth)/                       # grupo de rotas públicas
│   ├── _layout.tsx               # Stack sem header
│   ├── login.tsx
│   ├── registro.tsx
│   └── recuperar-senha.tsx
└── (tabs)/                       # grupo de rotas logadas (outlet)
    ├── _layout.tsx               # cabeçalho fixo + Tabs custom (renderizados uma vez)
    ├── hoje.tsx
    ├── ciclo.tsx
    ├── conteudos.tsx
    └── perfil.tsx

src/
├── tema/                         # design system centralizado
│   ├── cores.ts                  # paleta única
│   ├── espacamento.ts            # Espacamento + RaioBorda
│   ├── tipografia.ts             # tamanhos e pesos
│   └── index.ts
├── componentes/                  # componentes reutilizáveis e isolados
│   ├── BarraNavegacao.tsx        # tab bar custom com FAB rosa central
│   ├── Botao.tsx                 # botão primário (loading/disabled)
│   ├── CabecalhoLogado.tsx       # header fixo da área logada
│   ├── CampoTexto.tsx            # input com rótulo, foco e erro
│   ├── Cartao.tsx                # card branco arredondado
│   ├── LinkTexto.tsx             # link tocável rosa
│   ├── Logo.tsx                  # logo Flor completo (vertical)
│   ├── TituloPagina.tsx          # placeholder centralizado
│   └── index.ts
├── contextos/                    # estado global por contexto React
│   ├── ContextoUsuario.tsx       # Provider + hook useUsuario (com mock)
│   └── index.ts
├── paginas/                      # telas + formulários por área
│   ├── _compartilhado/
│   │   └── LayoutAutenticacao.tsx
│   ├── Login/
│   │   ├── index.tsx             # TelaLogin (composição)
│   │   └── FormularioLogin.tsx   # estado, validação, envio
│   ├── Registro/
│   │   ├── index.tsx
│   │   └── FormularioRegistro.tsx
│   ├── RecuperarSenha/
│   │   ├── index.tsx
│   │   └── FormularioRecuperarSenha.tsx
│   ├── Hoje/index.tsx            # placeholder
│   ├── Ciclo/index.tsx           # placeholder
│   ├── Conteudos/index.tsx       # placeholder
│   └── Perfil/index.tsx          # placeholder
└── tipos/                        # tipos TypeScript, um arquivo por área
    ├── componentes.ts            # Propriedades dos componentes
    ├── login.ts                  # DadosLogin, ErrosLogin, ...
    ├── registro.ts
    ├── recuperarSenha.ts
    ├── usuario.ts                # Usuario, ValorContextoUsuario
    └── index.ts                  # barrel
```

---

## Convenções

- **Idioma**: nomes de variáveis, funções, tipos, props e comentários **em
  português**. Exemplos: `Cores`, `Espacamento`, `definirEmail`,
  `aoEnviar`, `roteador`, `estilos`, `Propriedades...`.
- **Path alias**: `@/*` resolve para a raiz do projeto
  (configurado em `tsconfig.json`). Use `@/src/...` em todos os imports
  internos.
- **Imports de tipos**: sempre `import type { ... } from '@/src/tipos'` para
  evitar que tipos entrem no bundle final.
- **Separação tela ↔ formulário**: cada página tem um `index.tsx`
  (composição/UI) e um `FormularioX.tsx` (estado + validação + envio).
  Facilita testes e troca de UI sem mexer no formulário.
- **Tipos por área**: cada página/recurso tem seu próprio arquivo em
  `src/tipos/`. Para uma página nova, crie `src/tipos/<pagina>.ts` e
  exporte-o em `src/tipos/index.ts`.
- **Componentes isolados**: nada de styled-components ou libs de UI; tudo
  com `StyleSheet.create` e o tema centralizado.

### Padrão de nomenclatura de tipos

| Sufixo / Prefixo | Significado | Exemplos |
|---|---|---|
| `Dados...` | Payload do formulário / requisição | `DadosLogin`, `DadosRegistro` |
| `Erros...` | Mapa de erros de validação | `ErrosLogin`, `ErrosRegistro` |
| `Propriedades...` | Props de componente/formulário | `PropriedadesBotao`, `PropriedadesFormularioLogin` |
| `Valor...` | Valor de um contexto React | `ValorContextoUsuario` |
| `Tela...` | Componente de tela exportado nomeado | `TelaLogin`, `TelaHoje` |
| `Pagina...` | Wrapper default export usado pelo Expo Router | `PaginaLogin`, `PaginaHoje` |

---

## Tema (paleta e tipografia)

Toda cor, tamanho de espaçamento, raio de borda e estilo de texto vive em
`src/tema/`. Para mudar a identidade visual, edite apenas esses arquivos.

### Paleta principal (`src/tema/cores.ts`)

| Token | Valor | Uso |
|---|---|---|
| `Cores.fundo` | `#EFEEEE` | Background geral das telas |
| `Cores.cartao` | `#FFFFFF` | Cards |
| `Cores.bordaCartao` | `#E5E5E5` | Borda sutil de cards |
| `Cores.textoPrimario` | `#1A1A1A` | Títulos e textos principais |
| `Cores.textoSecundario` | `#6B6B6B` | Subtítulos e textos auxiliares |
| `Cores.rosa` | `#EC4B9C` | Cor primária da marca (ícone, links) |
| `Cores.rosaBotao` | `#F37AB5` | Cor padrão dos botões |
| `Cores.rosaBotaoPressionado` | `#E5559C` | Estado pressionado |
| `Cores.rosaBotaoDesabilitado` | `#F7B5D2` | Estado desabilitado |
| `Cores.campoFundo` | `#E8E6E6` | Background de inputs |
| `Cores.erro` | `#D14343` | Mensagens de erro |
| `Cores.sucesso` | `#2E8B57` | Mensagens de sucesso |

### Espaçamento e raio (`src/tema/espacamento.ts`)

```ts
Espacamento: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 }
RaioBorda:   { sm: 6, md: 10, lg: 16, xl: 24, circulo: 999 }
```

### Tipografia (`src/tema/tipografia.ts`)

Presets prontos: `tituloGrande`, `tituloMedio`, `subtitulo`, `corpo`,
`rotulo`, `botao`, `link`.

---

## Componentes

Todos exportados via `@/src/componentes`.

| Componente | Descrição |
|---|---|
| `Logo` | Logotipo vertical (ícone rosa + "Flor" + subtítulo). Usado nas telas de autenticação. |
| `CabecalhoLogado` | Header fixo da área logada (logo compacto horizontal). |
| `Cartao` | Card branco com borda arredondada. Aceita `estiloAdicional`. |
| `CampoTexto` | Input com rótulo, estado de foco (borda rosa) e mensagem de erro. |
| `Botao` | Botão primário rosa com estados `carregando` e `desabilitado`. |
| `LinkTexto` | Texto tocável (link estilizado). |
| `TituloPagina` | Placeholder centralizado com título e subtítulo opcional. |
| `BarraNavegacao` | Tab bar customizada (4 ícones + FAB rosa central elevado). |

---

## Rotas e navegação

A área logada usa o conceito de **outlet** do Expo Router via
`app/(tabs)/_layout.tsx`: o cabeçalho e a tab bar são renderizados **uma
única vez** e só o conteúdo central é trocado ao navegar entre tabs.

### Mapa de rotas

| Caminho | Tela | Tipo |
|---|---|---|
| `/` | Redirect → `/login` | público |
| `/login` | `TelaLogin` | público |
| `/registro` | `TelaRegistro` | público |
| `/recuperar-senha` | `TelaRecuperarSenha` | público |
| `/hoje` | `TelaHoje` | logado |
| `/ciclo` | `TelaCiclo` | logado |
| `/conteudos` | `TelaConteudos` | logado |
| `/perfil` | `TelaPerfil` | logado |

> Observação: ainda **não há guarda de rota** — qualquer rota logada é
> acessível diretamente. A proteção será adicionada lendo `autenticado` do
> `ContextoUsuario`.

---

## Contexto global de usuário

Estado de autenticação vive em `src/contextos/ContextoUsuario.tsx`, exposto
via hook `useUsuario()`.

### API

```ts
const { usuario, autenticado, carregando, entrar, sair } = useUsuario();
```

| Campo | Tipo | Descrição |
|---|---|---|
| `usuario` | `Usuario \| null` | Dados do usuário logado |
| `autenticado` | `boolean` | Atalho para `usuario !== null` |
| `carregando` | `boolean` | `true` durante chamada de `entrar()` |
| `entrar(dados)` | `Promise<void>` | Faz login. Lança erro se inválido. |
| `sair()` | `void` | Limpa o usuário do estado |

O `<ProvedorUsuario>` é colocado no `app/_layout.tsx`, dentro do
`SafeAreaProvider`.

### Mock de autenticação

Hoje o `entrar` valida com um `if` hardcoded contra o usuário de teste
(`teste@teste.com` / `123123`). Todas as linhas relacionadas estão marcadas
com `// MOCK:` para serem facilmente trocadas pela integração com a API
real.

### Persistência

O estado fica apenas em memória — ao fechar o app, a sessão é perdida. Quando
houver backend, persistir token com `expo-secure-store` é a recomendação.

---

## Como adicionar uma nova página

1. Crie a pasta `src/paginas/<Nome>/` com `index.tsx` exportando o componente
   nomeado `Tela<Nome>` (ex.: `TelaCalendario`).
2. Se a página tiver formulário, crie `Formulario<Nome>.tsx` separado.
3. Crie `src/tipos/<nome>.ts` com `Dados<Nome>`, `Erros<Nome>`,
   `PropriedadesFormulario<Nome>` etc. e exporte via `src/tipos/index.ts`.
4. Crie o arquivo de rota em `app/(auth)/` (público) ou `app/(tabs)/`
   (logado) com um default export wrappando a tela:
   ```tsx
   import { TelaCalendario } from '@/src/paginas/Calendario';

   export default function PaginaCalendario() {
     return <TelaCalendario />;
   }
   ```
5. Se for uma nova tab, adicione `<Tabs.Screen name="..." />` em
   `app/(tabs)/_layout.tsx` e o ícone correspondente em
   `BarraNavegacao.tsx`.

---

## Scripts

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o Metro bundler |
| `npm run android` | Roda no Android |
| `npm run ios` | Roda no iOS (macOS) |
| `npm run web` | Versão web |
| `npm run lint` | ESLint via Expo |

---

## Roadmap

- [ ] Guarda de rota: redirecionar para `/login` quando `!autenticado` em
  `(tabs)`
- [ ] Botão "Sair" na tela Perfil consumindo `useUsuario().sair`
- [ ] Persistência do usuário com `expo-secure-store`
- [ ] Integração real do login/registro com API
- [ ] Implementar conteúdo das telas: Hoje, Ciclo, Conteúdos, Perfil
- [ ] Modal de "adicionar registro" acionado pelo FAB central
