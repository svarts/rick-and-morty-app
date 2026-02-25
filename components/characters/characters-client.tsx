'use client';

import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { Users } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { CharacterFilters } from './character-filters';
import { CharacterGrid } from './character-grid';

export function CharactersClient() {
  const [filters] = useQueryStates(
    {
      status: parseAsString.withDefault(''),
      gender: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1),
    },
    { shallow: false }
  );

  const hasActiveFilters = filters.status || filters.gender;

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <div className="bg-card/50 border-border/60 rounded-xl border p-4">
        <CharacterFilters />
      </div>

      {/* Active filter summary */}
      {hasActiveFilters && (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Users className="h-4 w-4" />
          <span>
            Showing results for
            {filters.status && (
              <span className="text-primary font-medium"> status: {filters.status}</span>
            )}
            {filters.status && filters.gender && <span> and</span>}
            {filters.gender && (
              <span className="text-primary font-medium"> gender: {filters.gender}</span>
            )}
          </span>
        </div>
      )}

      <Separator className="opacity-30" />

      {/* Character grid */}
      <CharacterGrid />
    </div>
  );
}
