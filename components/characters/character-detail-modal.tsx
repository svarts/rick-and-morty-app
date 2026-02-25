'use client';

import Image from 'next/image';
import { Calendar, Heart, MapPin, Radio, Tv2, User } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useCharacterStore } from '@/store/character-store';
import type { Character, CharacterStatus } from '@/types/rick-and-morty';

interface CharacterDetailModalProps {
  character: Character | null;
  onClose: () => void;
}

function StatusBadge({ status }: { status: CharacterStatus }) {
  const variantMap: Record<CharacterStatus, 'default' | 'destructive' | 'secondary'> = {
    Alive: 'default',
    Dead: 'destructive',
    unknown: 'secondary',
  };
  const colorMap: Record<CharacterStatus, string> = {
    Alive: 'bg-emerald-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  };
  return (
    <Badge variant={variantMap[status]} className="items-center gap-1.5">
      <span className={`inline-block h-2 w-2 rounded-full ${colorMap[status]}`} />
      {status}
    </Badge>
  );
}

export function CharacterDetailModal({ character, onClose }: CharacterDetailModalProps) {
  const { toggleFavorite, isFavorite } = useCharacterStore();

  if (!character) return null;

  const favorite = isFavorite(character.id);
  const createdAt = new Date(character.created).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Dialog open={!!character} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg overflow-hidden p-0">
        <div className="relative h-64 w-full">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            sizes="512px"
            priority
          />
          <div className="from-background via-background/40 absolute inset-0 bg-gradient-to-t to-transparent" />
          <div className="absolute right-4 bottom-4 left-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white drop-shadow-lg">
                {character.name}
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={character.status} />
            <Badge variant="outline">{character.gender}</Badge>
            <Badge variant="secondary">ID #{character.id}</Badge>
            <Button
              variant={favorite ? 'default' : 'outline'}
              size="sm"
              className="ml-auto gap-1.5"
              onClick={() => toggleFavorite(character.id)}
            >
              <Heart className={`h-3.5 w-3.5 ${favorite ? 'fill-current' : ''}`} />
              {favorite ? 'Favorited' : 'Favorite'}
            </Button>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <InfoRow
              icon={<User className="h-4 w-4" />}
              label="Species"
              value={character.species}
            />
            {character.type && (
              <InfoRow icon={<User className="h-4 w-4" />} label="Type" value={character.type} />
            )}
            <InfoRow
              icon={<MapPin className="h-4 w-4" />}
              label="Origin"
              value={character.origin.name}
            />
            <InfoRow
              icon={<Radio className="h-4 w-4" />}
              label="Location"
              value={character.location.name}
            />
            <InfoRow
              icon={<Tv2 className="h-4 w-4" />}
              label="Episodes"
              value={`${character.episode.length} episodes`}
            />
            <InfoRow icon={<Calendar className="h-4 w-4" />} label="Created" value={createdAt} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
        {icon}
        {label}
      </div>
      <p className="text-foreground truncate text-sm font-medium">{value}</p>
    </div>
  );
}
