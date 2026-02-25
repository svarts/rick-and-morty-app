'use client';

import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { SlidersHorizontal, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const STATUS_OPTIONS = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
];

const GENDER_OPTIONS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' },
];

export function CharacterFilters() {
  const [filters, setFilters] = useQueryStates(
    {
      status: parseAsString.withDefault(''),
      gender: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1),
    },
    { shallow: false }
  );

  const activeFilterCount = [filters.status, filters.gender].filter(Boolean).length;

  const clearFilters = () => setFilters({ status: '', gender: '', page: 1 });

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <div className="text-muted-foreground flex shrink-0 items-center gap-2 text-sm">
        <SlidersHorizontal className="h-4 w-4" />
        <span className="font-medium">Filters</span>
        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="h-5 px-1.5 text-xs">
            {activeFilterCount}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-wrap gap-2">
        <Select
          value={filters.status || '__all__'}
          onValueChange={(val) => setFilters({ status: val === '__all__' ? '' : val, page: 1 })}
        >
          <SelectTrigger className="h-9 w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Statuses</SelectItem>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.gender || '__all__'}
          onValueChange={(val) => setFilters({ gender: val === '__all__' ? '' : val, page: 1 })}
        >
          <SelectTrigger className="h-9 w-[160px]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">All Genders</SelectItem>
            {GENDER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground h-9 gap-1.5"
            onClick={clearFilters}
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
