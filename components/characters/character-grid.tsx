'use client';

import { useState } from 'react';

import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

import { PaginationControls } from '@/components/layout/pagination-controls';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { CharacterGridSkeleton } from '@/components/shared/loading-skeleton';
import { useCharacters } from '@/hooks/use-characters';
import type { Character } from '@/types/rick-and-morty';
import { CharacterCard } from './character-card';
import { CharacterDetailModal } from './character-detail-modal';

export function CharacterGrid() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const [filters, setFilters] = useQueryStates(
    {
      status: parseAsString.withDefault(''),
      gender: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1),
    },
    { shallow: false }
  );

  const { data, isLoading, isError, error, refetch } = useCharacters({
    status: filters.status || undefined,
    gender: filters.gender || undefined,
    page: filters.page,
  });

  const handleReset = () => setFilters({ status: '', gender: '', page: 1 });

  if (isLoading) return <CharacterGridSkeleton />;

  if (isError) {
    return <ErrorState message={(error as Error).message} onRetry={() => refetch()} />;
  }

  if (!data || data.results.length === 0) {
    return <EmptyState onReset={handleReset} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.results.map((character) => (
          <CharacterCard key={character.id} character={character} onSelect={setSelectedCharacter} />
        ))}
      </div>

      <PaginationControls totalPages={data.info.pages} totalCount={data.info.count} />

      <CharacterDetailModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </div>
  );
}
