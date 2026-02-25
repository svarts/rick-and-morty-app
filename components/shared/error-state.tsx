import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="bg-destructive/10 flex h-20 w-20 items-center justify-center rounded-full">
        <AlertTriangle className="text-destructive h-10 w-10" />
      </div>
      <div>
        <h3 className="text-foreground text-xl font-semibold">Something went wrong</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          {message ?? 'Failed to load characters. Please try again.'}
        </p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
