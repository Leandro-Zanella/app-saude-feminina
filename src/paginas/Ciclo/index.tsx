import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Cartao } from '@/src/componentes';
import { listarCiclos, registrarCiclo, removerCiclo } from '@/src/servicos';
import { Cores, Espacamento, RaioBorda, Tipografia } from '@/src/tema';
import { calcularPrevisao, diferencaEmDias, formatarData, hojeIso, somarDias } from '@/src/utilitarios';
import type { MarcacaoDia, PrevisaoCiclo, RegistroCiclo } from '@/src/tipos';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

const TEMA_CALENDARIO = {
  calendarBackground: Cores.cartao,
  monthTextColor: Cores.textoPrimario,
  dayTextColor: Cores.textoPrimario,
  textDisabledColor: Cores.textoPlaceholder,
  arrowColor: Cores.rosa,
  todayTextColor: Cores.rosa,
  textSectionTitleColor: Cores.textoSecundario,
};

export function TelaCiclo() {
  const [registros, definirRegistros] = useState<RegistroCiclo[]>([]);
  const [carregando, definirCarregando] = useState(true);
  const [inicioSelecionado, definirInicioSelecionado] = useState<string | null>(null);

  useEffect(() => {
    listarCiclos()
      .then(definirRegistros)
      .finally(() => definirCarregando(false));
  }, []);

  const previsao = useMemo(() => calcularPrevisao(registros), [registros]);

  const diasMarcados = useMemo(
    () => montarDiasMarcados(registros, previsao, inicioSelecionado),
    [registros, previsao, inicioSelecionado],
  );

  const aoTocarNoDia = useCallback(
    async (dia: string) => {
      if (inicioSelecionado === null || dia < inicioSelecionado) {
        definirInicioSelecionado(dia);
        return;
      }

      definirInicioSelecionado(null);
      definirRegistros(await registrarCiclo({ inicio: inicioSelecionado, fim: dia }));
    },
    [inicioSelecionado],
  );

  const aoRemover = useCallback(async (id: string) => {
    definirRegistros(await removerCiclo(id));
  }, []);

  if (carregando) {
    return (
      <View style={estilos.centralizado}>
        <ActivityIndicator color={Cores.rosa} size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={estilos.conteudo}>
      <View>
        <Text style={estilos.titulo}>Meu ciclo</Text>
        <Text style={estilos.instrucao}>
          {inicioSelecionado === null
            ? 'Toque no primeiro dia da menstruação.'
            : `Início em ${formatarData(inicioSelecionado)}. Agora toque no último dia.`}
        </Text>
      </View>

      <Cartao estiloAdicional={estilos.cartaoCalendario}>
        <Calendar
          markingType="period"
          markedDates={diasMarcados}
          onDayPress={(dia) => aoTocarNoDia(dia.dateString)}
          maxDate={hojeIso()}
          theme={TEMA_CALENDARIO}
        />
        <View style={estilos.legenda}>
          <Legenda cor={Cores.rosa} texto="Registrado" />
          <Legenda cor={Cores.rosaBotaoDesabilitado} texto="Previsto" />
        </View>
      </Cartao>

      <CartaoPrevisao previsao={previsao} />

      <View style={estilos.blocoLista}>
        <Text style={estilos.subtituloSecao}>Registros</Text>
        {registros.length === 0 ? (
          <Text style={estilos.vazio}>Nenhum ciclo registrado ainda.</Text>
        ) : (
          registros.map((registro) => (
            <Cartao key={registro.id} estiloAdicional={estilos.itemRegistro}>
              <View>
                <Text style={estilos.itemTitulo}>
                  {formatarData(registro.inicio)}
                  {registro.fim ? ` a ${formatarData(registro.fim)}` : ' — em andamento'}
                </Text>
                {registro.fim ? (
                  <Text style={estilos.itemDetalhe}>
                    {diferencaEmDias(registro.inicio, registro.fim) + 1} dias
                  </Text>
                ) : null}
              </View>
              <Pressable onPress={() => aoRemover(registro.id)} hitSlop={8}>
                <Text style={estilos.remover}>Remover</Text>
              </Pressable>
            </Cartao>
          ))
        )}
      </View>
    </ScrollView>
  );
}

function CartaoPrevisao({ previsao }: { previsao: PrevisaoCiclo | null }) {
  if (!previsao) {
    return (
      <Cartao>
        <Text style={estilos.subtituloSecao}>Próximo ciclo</Text>
        <Text style={estilos.vazio}>Registre um ciclo para ver a previsão.</Text>
      </Cartao>
    );
  }

  return (
    <Cartao>
      <Text style={estilos.subtituloSecao}>Próximo ciclo</Text>
      <Text style={estilos.previsaoData}>{formatarData(previsao.proximoInicio)}</Text>
      <Text style={estilos.previsaoDetalhe}>
        {previsao.diasParaProximo === 0 ? 'previsto para hoje' : `em ${previsao.diasParaProximo} dias`}
      </Text>
      <Text style={estilos.previsaoDetalhe}>
        Ciclo médio de {previsao.cicloMedioDias} dias, duração de {previsao.duracaoMediaDias} dias.
      </Text>
      {previsao.historicoSuficiente ? null : (
        <Text style={estilos.previsaoAviso}>
          Estimativa com base no padrão de 28 dias. Registre outro ciclo para calcular a sua média.
        </Text>
      )}
    </Cartao>
  );
}

function Legenda({ cor, texto }: { cor: string; texto: string }) {
  return (
    <View style={estilos.itemLegenda}>
      <View style={[estilos.bolinha, { backgroundColor: cor }]} />
      <Text style={estilos.textoLegenda}>{texto}</Text>
    </View>
  );
}

function montarDiasMarcados(
  registros: RegistroCiclo[],
  previsao: PrevisaoCiclo | null,
  inicioSelecionado: string | null,
): Record<string, MarcacaoDia> {
  const marcados: Record<string, MarcacaoDia> = {};

  if (previsao) {
    marcarIntervalo(marcados, previsao.proximoInicio, previsao.proximoFim, Cores.rosaBotaoDesabilitado);
  }

  for (const registro of registros) {
    marcarIntervalo(marcados, registro.inicio, registro.fim ?? registro.inicio, Cores.rosa);
  }

  if (inicioSelecionado) {
    marcarIntervalo(marcados, inicioSelecionado, inicioSelecionado, Cores.rosaBotaoPressionado);
  }

  return marcados;
}

function marcarIntervalo(
  destino: Record<string, MarcacaoDia>,
  inicio: string,
  fim: string,
  cor: string,
): void {
  const total = Math.max(diferencaEmDias(inicio, fim), 0);

  for (let deslocamento = 0; deslocamento <= total; deslocamento += 1) {
    destino[somarDias(inicio, deslocamento)] = {
      color: cor,
      textColor: Cores.branco,
      startingDay: deslocamento === 0,
      endingDay: deslocamento === total,
    };
  }
}

const estilos = StyleSheet.create({
  conteudo: {
    padding: Espacamento.lg,
    gap: Espacamento.md,
  },
  centralizado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    ...Tipografia.tituloGrande,
    fontSize: 26,
    color: Cores.textoPrimario,
  },
  instrucao: {
    ...Tipografia.subtitulo,
    color: Cores.textoSecundario,
    marginTop: Espacamento.xs,
  },
  cartaoCalendario: {
    padding: Espacamento.sm,
  },
  legenda: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Espacamento.lg,
    paddingVertical: Espacamento.sm,
  },
  itemLegenda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamento.xs,
  },
  bolinha: {
    width: 10,
    height: 10,
    borderRadius: RaioBorda.circulo,
  },
  textoLegenda: {
    ...Tipografia.rotulo,
    fontSize: 12,
    color: Cores.textoSecundario,
  },
  subtituloSecao: {
    ...Tipografia.tituloMedio,
    fontSize: 16,
    color: Cores.textoPrimario,
  },
  previsaoData: {
    ...Tipografia.tituloGrande,
    fontSize: 28,
    color: Cores.rosa,
    marginTop: Espacamento.xs,
  },
  previsaoDetalhe: {
    ...Tipografia.corpo,
    color: Cores.textoSecundario,
  },
  previsaoAviso: {
    ...Tipografia.rotulo,
    fontSize: 12,
    color: Cores.textoPlaceholder,
    marginTop: Espacamento.sm,
  },
  blocoLista: {
    gap: Espacamento.sm,
  },
  itemRegistro: {
    padding: Espacamento.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitulo: {
    ...Tipografia.corpo,
    fontSize: 15,
    color: Cores.textoPrimario,
  },
  itemDetalhe: {
    ...Tipografia.rotulo,
    fontSize: 12,
    color: Cores.textoPlaceholder,
    marginTop: Espacamento.xs,
  },
  remover: {
    ...Tipografia.link,
    color: Cores.erro,
  },
  vazio: {
    ...Tipografia.corpo,
    color: Cores.textoSecundario,
    marginTop: Espacamento.xs,
  },
});
