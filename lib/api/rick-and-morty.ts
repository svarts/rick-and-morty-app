import type { Character, CharacterFilters, CharactersResponse } from '@/types/rick-and-morty';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchCharacters(filters: CharacterFilters = {}): Promise<CharactersResponse> {
  const params = new URLSearchParams();

  if (filters.status) params.append('status', filters.status);
  if (filters.gender) params.append('gender', filters.gender);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.name) params.append('name', filters.name);

  const url = `${BASE_URL}/character${params.toString() ? `?${params.toString()}` : ''}`;

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    if (response.status === 404) {
      return {
        info: { count: 0, pages: 0, next: null, prev: null },
        results: [],
      };
    }
    throw new Error(`Rick and Morty API error: ${response.status}`);
  }

  return response.json() as Promise<CharactersResponse>;
}

export async function fetchCharacterById(id: number): Promise<Character> {
  const response = await fetch(`${BASE_URL}/character/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Rick and Morty API error: ${response.status}`);
  }

  return response.json() as Promise<Character>;
}
