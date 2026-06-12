import { FC } from 'react';

import '../../styles.css';

import { cn } from '../../utils';
import { formatTimeSeconds } from '../../utils/time';
import { useSeekBar } from './useSeekBar';

export type PlayerSeekBarProps = {
  progress: number;
  elapsedSeconds: number;
  remainingSeconds: number;
  isLoading?: boolean;
  onSeek?: (percent: number) => void;
  className?: string;
};

export const PlayerBarSeekBar: FC<PlayerSeekBarProps> = ({
  progress,
  elapsedSeconds,
  remainingSeconds,
  isLoading = false,
  onSeek,
  className = '',
}) => {
  const { clamped, containerRef, handleClick, isInteractive } = useSeekBar({
    progress,
    isLoading,
    onSeek,
  });

  return (
    <div className={cn('w-full select-none', className)}>
      <div
        ref={containerRef}
        className={cn('group/seek relative h-4 w-full outline-none', {
          'pointer-events-none cursor-not-allowed': isLoading,
          'cursor-pointer': isInteractive,
        })}
        onClick={handleClick}
        aria-disabled={isLoading}
      >
        <div className="absolute right-0 left-0 z-10 flex h-full flex-row items-center justify-between px-2 pt-0.5 text-xs leading-none">
          <span className="text-foreground tabular-nums">
            {formatTimeSeconds(elapsedSeconds)}
          </span>
          <span className="text-foreground tabular-nums">
            {formatTimeSeconds(-Math.abs(remainingSeconds))}
          </span>
        </div>
        <div
          className={cn(
            'border-border bg-background-secondary absolute inset-0 border-t-(length:--border-width) transition-[filter,box-shadow] duration-150 ease-out group-hover/seek:brightness-105 motion-reduce:transition-none',
            {
              'overflow-hidden': isLoading,
            },
          )}
        >
          {isLoading && (
            <div className="bg-stripes-diagonal absolute inset-0 opacity-80" />
          )}
          {!isLoading && (
            <div
              className={cn(
                'bg-primary h-full transition-[width,filter] duration-150 ease-out group-hover/seek:brightness-110 motion-reduce:transition-none',
              )}
              style={{ width: `${clamped}%` }}
            />
          )}
        </div>
        {isInteractive && !isLoading && (
          <div
            className="border-border bg-primary shadow-shadow pointer-events-none absolute top-1/2 z-20 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-(length:--border-width) opacity-0 transition-[opacity,transform] duration-150 ease-out group-hover/seek:scale-110 group-hover/seek:opacity-100 motion-reduce:transition-none motion-reduce:group-hover/seek:scale-100"
            style={{ left: `${clamped}%` }}
          />
        )}
      </div>
    </div>
  );
};
