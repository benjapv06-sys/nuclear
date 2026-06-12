import { Music } from 'lucide-react';
import { FC } from 'react';

import { pickArtwork } from '@nuclearplayer/model';

import { cn } from '../../utils';
import { Box } from '../Box';
import type { QueueItemProps } from './types';
import { queueItemVariants } from './variants';

export const QueueItemCollapsed: FC<QueueItemProps> = ({
  track,
  status = 'idle',
  isCurrent = false,
  onSelect,
  classes,
}) => {
  const thumbnail = pickArtwork(track.artwork, 'thumbnail', 64);

  return (
    <div className="relative" data-testid="queue-item">
      <div
        className={cn(
          'pointer-events-none absolute -top-0.5 -left-0.5 h-10 w-10 rounded-md opacity-80 transition-[opacity,transform,background-color] duration-150 ease-out motion-reduce:transition-none',
          isCurrent && 'bg-primary',
          status === 'error' && 'bg-accent-red',
        )}
      />
      <Box
        variant="tertiary"
        shadow="none"
        className={cn(
          queueItemVariants({ status, isCurrent, isCollapsed: true }),
          classes?.root,
        )}
        onClick={onSelect}
        role={onSelect ? 'button' : undefined}
        tabIndex={onSelect ? 0 : undefined}
        onKeyDown={(event) => {
          if (!onSelect || (event.key !== 'Enter' && event.key !== ' ')) {
            return;
          }

          event.preventDefault();
          onSelect();
        }}
      >
        {thumbnail?.url ? (
          <img
            src={thumbnail.url}
            alt={track.title}
            className={cn(
              'h-full w-full object-cover transition-[filter,transform] duration-200 ease-out group-hover:scale-110 group-hover:brightness-110 group-focus-visible:scale-110 group-focus-visible:brightness-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100',
              classes?.thumbnail,
            )}
          />
        ) : (
          <Music size={16} className="text-foreground opacity-20" />
        )}

        {status === 'loading' && (
          <div className="bg-stripes-diagonal absolute inset-x-0 bottom-0 h-1" />
        )}
      </Box>
    </div>
  );
};
