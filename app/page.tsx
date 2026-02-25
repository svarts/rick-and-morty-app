import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { CharactersClient } from '@/components/characters/characters-client';
import { Header } from '@/components/layout/header';
import { fetchCharacters } from '@/lib/api/rick-and-morty';
import { searchParamsCache } from '@/lib/search-params';
import { characterKeys } from '@/hooks/use-characters';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home({ searchParams }: PageProps) {
  const { status, gender, page } = await searchParamsCache.parse(searchParams);

  const queryClient = new QueryClient();

  const filters = {
    status: status || undefined,
    gender: gender || undefined,
    page: page ?? 1,
  };

  await queryClient.prefetchQuery({
    queryKey: characterKeys.list(filters),
    queryFn: () => fetchCharacters(filters),
  });

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container mx-auto max-w-screen-xl px-4 py-8">
        <div className="mb-8">
          <h2 className="text-foreground mb-2 text-3xl font-bold">Characters</h2>
          <p className="text-muted-foreground">
            Explore all characters from the Rick and Morty universe. Filter by status and gender to
            find who you&apos;re looking for.
          </p>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CharactersClient />
        </HydrationBoundary>
      </main>
    </div>
  );
}
