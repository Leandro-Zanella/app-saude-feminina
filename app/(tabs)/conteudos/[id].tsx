import { useLocalSearchParams } from 'expo-router';
import { TelaArtigo } from '@/src/paginas/Artigo';

export default function PaginaArtigo() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <TelaArtigo id={Number(id)} />;
}
