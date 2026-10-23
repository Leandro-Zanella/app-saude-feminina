import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Cartao } from '@/src/componentes';
import { Cores, Espacamento, RaioBorda, Tipografia } from '@/src/tema';

const PREVISAO_MOCK = {
  proximoInicio: '03 de novembro',
  diasParaProximo: 12,
  cicloMedioDias: 29,
  duracaoMediaDias: 5,
};

const FASE_MOCK = {
  nome: 'Fase lútea',
  diaDoCiclo: 17,
  descricao: 'Período após a ovulação. É comum sentir mais cansaço e alterações de humor.',
};

const SINTOMAS_MOCK = ['Cólica leve', 'Inchaço', 'Sono'];

const DICA_MOCK =
  'Beber bastante água e manter uma rotina de sono ajuda a reduzir os sintomas da TPM.';

export function TelaHoje() {
  return (
    <ScrollView contentContainerStyle={estilos.conteudo}>
      <View>
        <Text style={estilos.titulo}>Hoje</Text>
        <Text style={estilos.subtitulo}>Resumo do seu ciclo</Text>
      </View>

      <Cartao>
        <Text style={estilos.rotulo}>Próxima menstruação</Text>
        <Text style={estilos.destaque}>{PREVISAO_MOCK.proximoInicio}</Text>
        <Text style={estilos.detalhe}>em {PREVISAO_MOCK.diasParaProximo} dias</Text>
        <Text style={estilos.detalhe}>
          Ciclo médio de {PREVISAO_MOCK.cicloMedioDias} dias, duração de{' '}
          {PREVISAO_MOCK.duracaoMediaDias} dias.
        </Text>
      </Cartao>

      <Cartao>
        <Text style={estilos.rotulo}>Fase atual</Text>
        <Text style={estilos.destaqueMenor}>{FASE_MOCK.nome}</Text>
        <Text style={estilos.detalhe}>Dia {FASE_MOCK.diaDoCiclo} do ciclo</Text>
        <Text style={estilos.descricao}>{FASE_MOCK.descricao}</Text>
      </Cartao>

      <Cartao>
        <Text style={estilos.rotulo}>Sintomas de hoje</Text>
        <View style={estilos.etiquetas}>
          {SINTOMAS_MOCK.map((sintoma) => (
            <View key={sintoma} style={estilos.etiqueta}>
              <Text style={estilos.textoEtiqueta}>{sintoma}</Text>
            </View>
          ))}
        </View>
      </Cartao>

      <Cartao>
        <Text style={estilos.rotulo}>Dica do dia</Text>
        <Text style={estilos.descricao}>{DICA_MOCK}</Text>
      </Cartao>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  conteudo: {
    padding: Espacamento.lg,
    gap: Espacamento.md,
  },
  titulo: {
    ...Tipografia.tituloGrande,
    fontSize: 26,
    color: Cores.textoPrimario,
  },
  subtitulo: {
    ...Tipografia.subtitulo,
    color: Cores.textoSecundario,
    marginTop: Espacamento.xs,
  },
  rotulo: {
    ...Tipografia.tituloMedio,
    fontSize: 16,
    color: Cores.textoPrimario,
  },
  destaque: {
    ...Tipografia.tituloGrande,
    fontSize: 28,
    color: Cores.rosa,
    marginTop: Espacamento.xs,
  },
  destaqueMenor: {
    ...Tipografia.tituloMedio,
    fontSize: 20,
    color: Cores.rosa,
    marginTop: Espacamento.xs,
  },
  detalhe: {
    ...Tipografia.corpo,
    color: Cores.textoSecundario,
  },
  descricao: {
    ...Tipografia.corpo,
    color: Cores.textoSecundario,
    marginTop: Espacamento.xs,
    lineHeight: 20,
  },
  etiquetas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Espacamento.sm,
    marginTop: Espacamento.sm,
  },
  etiqueta: {
    backgroundColor: Cores.rosaBotaoDesabilitado,
    borderRadius: RaioBorda.circulo,
    paddingHorizontal: Espacamento.md,
    paddingVertical: Espacamento.xs,
  },
  textoEtiqueta: {
    ...Tipografia.rotulo,
    fontSize: 12,
    color: Cores.textoPrimario,
  },
});
