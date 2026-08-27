let tokenAtual: string | null = null;

export function definirToken(token: string | null): void {
  tokenAtual = token;
}

export function obterToken(): string | null {
  return tokenAtual;
}
