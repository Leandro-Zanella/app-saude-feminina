import { useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { lerAlturaDaMensagem, montarDocumentoHtml } from './documentoHtml';
import type { PropriedadesVisualizadorHtml } from '@/src/tipos';

const ALTURA_INICIAL = 200;

export function VisualizadorHtml({ html }: PropriedadesVisualizadorHtml) {
  const [altura, definirAltura] = useState(ALTURA_INICIAL);

  return (
    <WebView
      style={[estilos.webview, { height: altura }]}
      originWhitelist={['*']}
      source={{ html: montarDocumentoHtml(html) }}
      onMessage={(evento) => {
        const alturaRecebida = lerAlturaDaMensagem(evento.nativeEvent.data);
        if (alturaRecebida) {
          definirAltura(alturaRecebida);
        }
      }}
      scrollEnabled={false}
      onShouldStartLoadWithRequest={({ url, navigationType }) => {
        if (navigationType === 'click' && /^https?:\/\//.test(url)) {
          Linking.openURL(url);
          return false;
        }
        return true;
      }}
    />
  );
}

const estilos = StyleSheet.create({
  webview: {
    width: '100%',
    backgroundColor: 'transparent',
  },
});
