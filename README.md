# Flor — App de Saúde & Bem-estar Feminino

Aplicativo mobile para acompanhamento do ciclo menstrual, sintomas, conteúdos
educativos e bem-estar feminino. Construído em **React Native + Expo Router**
com TypeScript estrito e convenções em português.

> Status: em desenvolvimento. Login e cadastro integrados com a
> [API Spring](../api-saude-feminina), consumo de artigos pronto em
> `src/servicos/`, e esqueleto da área logada (tabs) com placeholders.

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

### A API precisa estar no ar

O login não é mais mockado. Antes de abrir o app, suba o banco e a API:

```bash
cd ../api-saude-feminina
docker compose up -d      # Postgres na 5432
./mvnw spring-boot:run    # API na 8080
```

Depois crie uma conta pela própria tela de cadastro do app, ou via curl:

```bash
curl -X POST http://localhost:8080/api/user/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Maria Souza","email":"maria@saudefeminina.com","password":"maria123","userRole":"USER"}'
```

O app resolve o endereço da API sozinho por plataforma — veja
[Camada de serviços](#camada-de-serviços).

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
│   ├── ContextoUsuario.tsx       # Provider + hook useUsuario (consome a API)
│   └── index.ts
├── servicos/                     # única camada que conhece a origem dos dados
│   ├── configuracao.ts           # URL_BASE_API + montarUrlMidia
│   ├── clienteHttp.ts            # fetch com Bearer, timeout e ErroApi
│   ├── autenticacao.ts           # autenticar, registrar, encerrarSessao
│   ├── artigos.ts                # listarArtigos, obterArtigo
│   ├── ciclos.ts                 # listarCiclos, registrarCiclo, removerCiclo
│   ├── sessao.ts                 # guarda o token
│   ├── mock/                     # dados locais, trocáveis pela API depois
│   │   └── ciclos.ts             # AsyncStorage + semeadura inicial
│   └── index.ts
├── utilitarios/                  # funções puras sem dependência de UI
│   ├── formatacao.ts             # formatarData
│   ├── ciclo.ts                  # aritmética de datas + calcularPrevisao
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
const { usuario, token, autenticado, carregando, entrar, cadastrar, sair } = useUsuario();
```

| Campo | Tipo | Descrição |
|---|---|---|
| `usuario` | `Usuario \| null` | Dados do usuário logado, vindos do login |
| `token` | `string \| null` | JWT da sessão |
| `autenticado` | `boolean` | Atalho para `usuario !== null` |
| `carregando` | `boolean` | `true` durante `entrar()` ou `cadastrar()` |
| `entrar(dados)` | `Promise<void>` | Faz login. Lança `ErroApi` se inválido. |
| `cadastrar(dados)` | `Promise<void>` | Registra e já entra. Lança `ErroApi` no 409. |
| `sair()` | `void` | Descarta usuário e token |

O `<ProvedorUsuario>` é colocado no `app/_layout.tsx`, dentro do
`SafeAreaProvider`.

### Cadastro

`cadastrar(dados)` faz duas chamadas: `POST /api/user/register` e, em
seguida, `POST /api/user/login` — porque o registro devolve o usuário, mas
não devolve token. O resultado é a pessoa já logada ao final do cadastro.

O `userRole` é fixo em `USER` dentro de `src/servicos/autenticacao.ts`: o
papel nunca vem da tela. Contas `ADMIN` são criadas pela gestão web.

### Persistência

O estado fica apenas em memória — ao fechar o app, a sessão é perdida. Quando
houver backend, persistir token com `expo-secure-store` é a recomendação.

---

## Camada de serviços

`src/servicos/` é a **única** parte do app que conhece a API. Telas e contextos
falam só com essas funções, então trocar endpoint, formato de erro ou host não
vaza para o resto do código.

### Funções

| Função | Rota | Devolve |
|---|---|---|
| `autenticar({ email, senha })` | `POST /api/user/login` | `SessaoAutenticada` (`{ usuario, token }`) |
| `registrar({ nome, email, senha })` | `POST /api/user/register` | `Usuario` |
| `encerrarSessao()` | — | `void` (descarta o token) |
| `listarArtigos()` | `GET /api/article` | `Artigo[]` |
| `obterArtigo(id)` | `GET /api/article/{id}` | `Artigo` |

`autenticar` guarda o token em `sessao.ts`, então as chamadas seguintes já
saem com o header `Authorization: Bearer ...` automaticamente.

### Tradução de nomes

A API responde em inglês (`title`, `contentHtml`, `authorName`), o app usa
português. A conversão acontece nos serviços: `src/tipos/api.ts` descreve o
contrato cru da API, e `src/tipos/artigo.ts` o modelo do app. Nenhuma tela
recebe campo em inglês.

`coverImageUrl` chega relativo (`/media/uuid.png`) e sai absoluto em `urlCapa`,
senão o `<Image>` não carrega.

### Endereço da API

`URL_BASE_API` é resolvido por plataforma, porque cada alvo enxerga a sua
máquina de um jeito diferente:

| Alvo | Host usado |
|---|---|
| Web (browser) | `localhost:8080` |
| Emulador Android | `10.0.2.2:8080` (`localhost` lá é o próprio emulador) |
| Celular físico (Expo Go) | IP da máquina na rede, lido do `hostUri` do Metro |

Para apontar para outro ambiente, defina `EXPO_PUBLIC_API_URL` no `.env`.

### Erros

Toda resposta não-2xx virá como `ErroApi`, com a mensagem já pronta para a
tela:

```ts
import { ErroApi, listarArtigos } from '@/src/servicos';

try {
  const artigos = await listarArtigos();
} catch (erro) {
  if (erro instanceof ErroApi && erro.ehFalhaDeConexao) {
    // API fora do ar ou host errado — status 0
  }
}
```

| Campo | Descrição |
|---|---|
| `status` | Status HTTP, ou `0` quando a requisição nem chegou na API |
| `message` | Mensagem da API (`{ "message": ... }`) ou um texto por status |
| `errosPorCampo` | Só nos 400 de validação: `{ "email": "must not be blank" }` |
| `ehFalhaDeConexao` | `true` quando `status === 0` |

---

## Calendário de ciclo

A tela de Ciclo é a única parte do app que hoje **não** consome a API: os
registros ficam no dispositivo, via `AsyncStorage`.

### A costura para trocar depois

`src/servicos/ciclos.ts` é a interface pública (`listarCiclos`,
`registrarCiclo`, `removerCiclo`) e hoje delega para
`src/servicos/mock/ciclos.ts`. Quando a API tiver as rotas de ciclo, só esse
arquivo muda — a tela importa de `@/src/servicos` e não sabe de onde vem o
dado.

Na primeira abertura o mock **semeia 3 ciclos** relativos à data de hoje, para
a previsão já ter média (ela precisa de 2 registros) e a tela nunca aparecer
vazia.

### Datas como texto

Tudo é `'YYYY-MM-DD'`, nunca `Date`. Não há fuso para atrapalhar, a ordenação
é comparação de texto, e é exatamente o formato de chave que o `markedDates`
do `react-native-calendars` espera — zero conversão entre camadas.

### Registro em dois toques

Não há date picker: `onDayPress` do calendário devolve o dia já em
`'YYYY-MM-DD'`. O primeiro toque marca o início, o segundo o fim. Tocar num
dia anterior ao início selecionado recomeça a seleção.

### Cálculo da previsão

Em `src/utilitarios/ciclo.ts`, funções puras:

```text
duracaoMedia  = média(fim − início + 1) dos registros fechados   → padrão 5
cicloMedio    = média(início[i] − início[i+1]) se ≥ 2 registros  → padrão 28
próximoInício = últimoInício + cicloMedio
próximoFim    = próximoInício + duracaoMedia − 1
```

O ciclo é medido **início a início**, como na definição clínica — não do fim de
um período ao início do seguinte.

Três detalhes que evitam resultado absurdo:

- só entram no cálculo registros com `inicio <= hoje`; um ciclo que não
  aconteceu não pode informar previsão;
- se o último registro é antigo, `próximoInício` avança de `cicloMedio` em
  `cicloMedio` até passar de hoje, então a previsão nunca aparece no passado;
- `cicloMedio` tem piso de 15 dias, o que descarta dado degenerado (dois
  registros no mesmo dia) e garante que o laço acima termine.

`historicoSuficiente` é `false` quando caiu no padrão de 28 dias, e a tela
avisa que é estimativa.

### Cores no calendário

| Cor | Significado |
|---|---|
| `Cores.rosa` | período registrado |
| `Cores.rosaBotaoDesabilitado` | período previsto |
| `Cores.rosaBotaoPressionado` | início aguardando o segundo toque |

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
- [x] Botão "Sair" na tela Perfil consumindo `useUsuario().sair`
- [ ] Persistência do token com `expo-secure-store` (hoje só em memória)
- [x] Integração real do login/registro com API
- [x] Tela de Conteúdos consumindo `listarArtigos()`
- [x] Renderizar `conteudoHtml` (WebView no nativo, iframe no web)
- [x] Calendário de ciclo com registro local e previsão
- [ ] Trocar `servicos/mock/ciclos.ts` pela API quando ela tiver as rotas de ciclo
- [ ] Implementar conteúdo das telas: Hoje, Ciclo, Conteúdos, Perfil
- [ ] Modal de "adicionar registro" acionado pelo FAB central
