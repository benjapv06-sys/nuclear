import { AlertCircle, Music, X } from 'lucide-react';
import { FC } from 'react';

import { pickArtwork } from '@nuclearplayer/model';

import { cn } from '../../utils';
import { formatTimeMillis } from '../../utils/time';
import { Box } from '../Box';
import { Button } from '../Button';
import type { QueueItemProps } from './types';
import { queueItemVariants } from './variants';

export const QueueItemExpanded: FC<QueueItemProps> = ({
  track,
  status = 'idle',
  isCurrent = false,
  onSelect,
  onRemove,
  labels,
  classes,
}) => {
  const thumbnail = pickArtwork(track.artwork, 'thumbnail', 64);
  const duration = formatTimeMillis(track.durationMs);
  const primaryArtist = track.artists[0]?.name;

  return (
    <Box
      data-testid="queue-item"
      data-is-current={isCurrent}
      variant="tertiary"
      shadow="none"
      className={cn(
        'group',
        queueItemVariants({ status, isCurrent, isCollapsed: false }),
        classes?.root,
      )}
      onClick={onSelect}
      onDoubleClick={onSelect}
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
      {status === 'error' && (
        <div className="bg-accent-red absolute top-0 right-0 bottom-0 left-0 w-2 border-0" />
      )}
      {isCurrent && status !== 'error' && (
        <div className="bg-foreground/30 absolute top-2 bottom-2 left-0 w-1 rounded-r-full transition-[opacity,transform] duration-150 group-hover:scale-y-110 motion-reduce:transition-none" />
      )}
      <div
        data-testid="queue-item-thumbnail"
        className={cn(
          'bg-background border-border/60 group-hover:shadow-shadow flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm border transition-[box-shadow,transform] duration-150 ease-out group-hover:-translate-y-px motion-reduce:transition-none motion-reduce:group-hover:translate-y-0',
          classes?.thumbnail,
        )}
      >
        {thumbnail?.url ? (
          <img
            src={thumbnail.url}
            alt={track.title}
            className="h-full w-full object-cover transition-transform duration-200 ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
          />
        ) : (
          <Music
            size={32}
            absoluteStrokeWidth
            className="text-foreground opacity-20"
          />
        )}
      </div>

      <div className={cn('min-w-0 flex-1', classes?.content)}>
        <div
          data-testid="queue-item-title"
          className={cn(
            'text-foreground group-hover:text-primary truncate text-sm font-bold transition-colors duration-150 motion-reduce:transition-none',
            classes?.title,
          )}
        >
          {track.title}
        </div>
        <div
          data-testid="queue-item-artist"
          className={cn('text-foreground truncate text-xs', classes?.artist)}
        >
          {primaryArtist}
        </div>
        {status === 'error' && (
          <div
            data-testid="queue-item-error"
            className={cn(
              'bg-accent-red text-foreground border-border mt-1 inline-flex max-w-full items-center gap-1 rounded-sm border px-1 py-0.5 text-xs',
              classes?.error,
            )}
          >
            <AlertCircle size={12} />
            <span className="truncate">{labels.playbackError}</span>
          </div>
        )}
      </div>

      <div className="relative flex shrink-0 items-center justify-start">
        {duration && (
          <div
            data-testid="queue-item-duration"
            className={cn(
              'text-foreground mr-4 text-sm tabular-nums transition-[opacity,transform] duration-150 group-focus-within:-translate-x-1 group-focus-within:opacity-70 group-hover:-translate-x-1 group-hover:opacity-70 motion-reduce:transition-none',
              classes?.duration,
            )}
          >
            {duration}
          </div>
        )}

        {onRemove && (
          <Button
            data-testid="queue-item-remove-button"
            size="icon-sm"
            variant="noShadow"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemove();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={labels?.removeButton}
            className={cn(
              'absolute right-4 translate-x-2 opacity-0 transition-[opacity,transform] duration-150 ease-out group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none',
              classes?.removeButton,
            )}
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {status === 'loading' && (
        <div className="bg-stripes-diagonal absolute inset-x-0 bottom-0 h-1" />
      )}
    </Box>
  );
};
