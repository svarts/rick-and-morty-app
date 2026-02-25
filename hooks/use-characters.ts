import { useQuery } from '@tanstack/react-query';

import { fetchCharacterById, fetchCharacters } from '@/lib/api/rick-and-morty';
import type { CharacterFilters } from '@/types/rick-and-morty';

export const characterKeys = {
  all: ['characters'] as const,
  lists: () => [...characterKeys.all, 'list'] as const,
  list: (filters: CharacterFilters) => [...characterKeys.lists(), filters] as const,
  details: () => [...characterKeys.all, 'detail'] as const,
  detail: (id: number) => [...characterKeys.details(), id] as const,
};

export function useCharacters(filters: CharacterFilters = {}) {
  return useQuery({
    queryKey: characterKeys.list(filters),
    queryFn: () => fetchCharacters(filters),
  });
}

export function useCharacter(id: number) {
  return useQuery({
    queryKey: characterKeys.detail(id),
    queryFn: () => fetchCharacterById(id),
    enabled: id > 0,
  });
}
