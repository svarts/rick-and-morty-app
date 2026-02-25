'use client';

import Image from 'next/image';
import { Heart, MapPin, User } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCharacterStore } from '@/store/character-store';
import type { Character, CharacterStatus } from '@/types/rick-and-morty';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

function StatusDot({ status }: { status: CharacterStatus }) {
  const colorMap: Record<CharacterStatus, string> = {
    Alive: 'bg-emerald-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  };

  return <span className={`inline-block h-2 w-2 rounded-full ${colorMap[status]} mr-1.5`} />;
}

function StatusBadge({ status }: { status: CharacterStatus }) {
  const variantMap: Record<CharacterStatus, 'default' | 'destructive' | 'secondary'> = {
    Alive: 'default',
    Dead: 'destructive',
    unknown: 'secondary',
  };

  return (
    <Badge variant={variantMap[status]} className="items-center gap-1 text-xs">
      <StatusDot status={status} />
      {status}
    </Badge>
  );
}

export function CharacterCard({ character, onSelect }: CharacterCardProps) {
  const { toggleFavorite, isFavorite } = useCharacterStore();
  const favorite = isFavorite(character.id);

  return (
    <Card
      className="group hover:shadow-primary/10 border-border/60 bg-card cursor-pointer overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      onClick={() => onSelect(character)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-background/70 hover:bg-background/90 h-8 w-8 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(character.id);
            }}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${favorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
            />
          </Button>
        </div>
        <div className="from-card absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t to-transparent" />
      </div>
      <CardContent className="space-y-2 p-3">
        <h3 className="text-foreground truncate text-sm leading-tight font-semibold">
          {character.name}
        </h3>
        <StatusBadge status={character.status} />
        <div className="space-y-1">
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <User className="h-3 w-3 shrink-0" />
            <span className="truncate">
              {character.species}
              {character.type ? ` — ${character.type}` : ''}
            </span>
          </div>
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{character.location.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
