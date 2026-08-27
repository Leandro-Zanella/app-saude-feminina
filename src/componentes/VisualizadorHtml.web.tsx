import { useEffect, useState } from 'react';
import { lerAlturaDaMensagem, montarDocumentoHtml } from './documentoHtml';
import type { PropriedadesVisualizadorHtml } from '@/src/tipos';

const ALTURA_INICIAL = 200;

export function VisualizadorHtml({ html }: PropriedadesVisualizadorHtml) {
  const [altura, definirAltura] = useState(ALTURA_INICIAL);

  useEffect(() => {
    const aoReceberMensagem = (evento: MessageEvent) => {
      const alturaRecebida = lerAlturaDaMensagem(evento.data);
      if (alturaRecebida) {
        definirAltura(alturaRecebida);
      }
    };

    window.addEventListener('message', aoReceberMensagem);
    return () => window.removeEventListener('message', aoReceberMensagem);
  }, []);

  return (
    <iframe
      title="Conteúdo do artigo"
      srcDoc={montarDocumentoHtml(html)}
      style={{ width: '100%', height: altura, border: 0, display: 'block' }}
    />
  );
}
