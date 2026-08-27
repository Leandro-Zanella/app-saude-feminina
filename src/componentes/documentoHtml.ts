import { URL_BASE_API } from '@/src/servicos';
import { Cores, RaioBorda } from '@/src/tema';

const SCRIPT_ALTURA = `
  (function () {
    function enviarAltura() {
      var mensagem = JSON.stringify({ altura: document.body.scrollHeight });
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(mensagem);
      } else if (window.parent !== window) {
        window.parent.postMessage(mensagem, '*');
      }
    }
    new ResizeObserver(enviarAltura).observe(document.body);
    window.addEventListener('load', enviarAltura);
    enviarAltura();
  })();
`;

export function montarDocumentoHtml(conteudoHtml: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<base href="${URL_BASE_API}/">
<style>
  body {
    margin: 0;
    background: ${Cores.cartao};
    color: ${Cores.textoPrimario};
    font-family: system-ui, -apple-system, Roboto, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    overflow-wrap: break-word;
  }
  h1, h2, h3 { line-height: 1.25; margin: 1.2em 0 0.5em; }
  h1 { font-size: 1.5em; }
  h2 { font-size: 1.25em; }
  h3 { font-size: 1.1em; }
  p { margin: 0 0 1em; }
  a { color: ${Cores.rosa}; }
  ul, ol { margin: 0 0 1em; padding-left: 1.25em; }
  img, video, iframe {
    display: block;
    max-width: 100%;
    margin: 1em 0;
    border: 0;
    border-radius: ${RaioBorda.md}px;
  }
  iframe, video { width: 100%; height: auto; aspect-ratio: 16 / 9; }
  blockquote {
    margin: 0 0 1em;
    padding-left: 1em;
    border-left: 3px solid ${Cores.bordaCartao};
    color: ${Cores.textoSecundario};
  }
  table { width: 100%; border-collapse: collapse; margin: 0 0 1em; }
  th, td { border: 1px solid ${Cores.bordaCartao}; padding: 0.4em; }
  pre { overflow-x: auto; }
  :last-child { margin-bottom: 0; }
</style>
</head>
<body>${conteudoHtml}<script>${SCRIPT_ALTURA}</script></body>
</html>`;
}

export function lerAlturaDaMensagem(dados: unknown): number | null {
  if (typeof dados !== 'string') {
    return null;
  }
  try {
    const { altura } = JSON.parse(dados) as { altura?: unknown };
    return typeof altura === 'number' && altura > 0 ? altura : null;
  } catch {
    return null;
  }
}
