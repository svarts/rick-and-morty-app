import { Dna } from 'lucide-react';

export function Header() {
  return (
    <header className="border-border bg-card/50 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center gap-3 px-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 flex h-9 w-9 items-center justify-center rounded-full">
            <Dna className="text-primary h-5 w-5" />
          </div>
          <div>
            <h1 className="text-foreground text-lg leading-tight font-bold">Rick &amp; Morty</h1>
            <p className="text-muted-foreground text-xs leading-tight">Character Explorer</p>
          </div>
        </div>
        <div className="ml-auto">
          <span className="text-muted-foreground bg-muted rounded-full px-2.5 py-1 font-mono text-xs">
            Wubba Lubba Dub Dub!
          </span>
        </div>
      </div>
    </header>
  );
}
