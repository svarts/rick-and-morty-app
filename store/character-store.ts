import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Character } from '@/types/rick-and-morty';

interface CharacterState {
  favorites: number[];
  selectedCharacter: Character | null;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  setSelectedCharacter: (character: Character | null) => void;
}

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      favorites: [],
      selectedCharacter: null,

      addFavorite: (id) =>
        set((state) => ({
          favorites: [...state.favorites, id],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== id),
        })),

      toggleFavorite: (id) => {
        if (get().isFavorite(id)) {
          get().removeFavorite(id);
        } else {
          get().addFavorite(id);
        }
      },

      isFavorite: (id) => get().favorites.includes(id),

      setSelectedCharacter: (character) => set({ selectedCharacter: character }),
    }),
    {
      name: 'character-store',
    }
  )
);
