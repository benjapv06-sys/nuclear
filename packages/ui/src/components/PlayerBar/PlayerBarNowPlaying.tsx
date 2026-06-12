import { Music2 } from 'lucide-react';
import { FC, ReactNode } from 'react';

import { cn } from '../../utils';

type PlayerBarNowPlayingProps = {
  title: string;
  artist: string;
  coverUrl?: string;
  className?: string;
  action?: ReactNode;
};

export const PlayerBarNowPlaying: FC<PlayerBarNowPlayingProps> = ({
  title,
  artist,
  coverUrl,
  className = '',
  action,
}) => (
  <div
    className={cn(
      'group/now-playing flex min-w-0 items-center gap-3',
      className,
    )}
  >
    <div className="border-border bg-background-secondary group-hover/now-playing:shadow-shadow size-12 shrink-0 overflow-hidden rounded-md border-(length:--border-width) transition-[box-shadow,transform] duration-150 ease-out group-hover/now-playing:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover/now-playing:translate-y-0">
      {coverUrl ? (
        <img
          src={coverUrl}
          alt=""
          className="size-full object-cover transition-[filter,transform] duration-200 ease-out select-none group-hover/now-playing:scale-105 group-hover/now-playing:brightness-110 motion-reduce:transition-none motion-reduce:group-hover/now-playing:scale-100"
          data-testid="player-now-playing-thumbnail"
        />
      ) : (
        <div
          className="text-foreground-secondary flex size-full items-center justify-center"
          data-testid="player-now-playing-placeholder"
        >
          <Music2 size={20} />
        </div>
      )}
    </div>
    <div className="min-w-0 flex-1">
      <div
        className="text-foreground truncate text-sm font-bold"
        title={title}
        data-testid="now-playing-title"
      >
        {title}
      </div>
      <div
        className="text-foreground-secondary truncate text-xs"
        title={artist}
        data-testid="player-now-playing-artist"
      >
        {artist}
      </div>
    </div>
    {action}
  </div>
);
