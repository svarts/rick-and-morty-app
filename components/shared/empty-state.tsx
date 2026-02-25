import { Ghost } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
        <Ghost className="text-muted-foreground h-10 w-10" />
      </div>
      <div>
        <h3 className="text-foreground text-xl font-semibold">No characters found</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          No characters match your current filters. Try adjusting them.
        </p>
      </div>
      <Button variant="outline" onClick={onReset}>
        Clear All Filters
      </Button>
    </div>
  );
}
