export function formatarData(dataIso: string): string {
  const [data] = dataIso.split('T');
  const [ano, mes, dia] = data.split('-');

  if (!ano || !mes || !dia) {
    return dataIso;
  }

  return `${dia}/${mes}/${ano}`;
}
