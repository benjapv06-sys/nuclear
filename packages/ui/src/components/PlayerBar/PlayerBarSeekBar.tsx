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
    <div
      className={cn(
        'flex w-full flex-row items-center gap-3 select-none',
        className,
      )}
    >
      <span className="text-foreground-secondary min-w-[38px] text-right text-[11px] font-medium tabular-nums">
        {formatTimeSeconds(elapsedSeconds)}
      </span>
      <div
        ref={containerRef}
        className={cn(
          'group/seek relative flex h-6 flex-1 items-center outline-none',
          {
            'pointer-events-none cursor-not-allowed': isLoading,
            'cursor-pointer': isInteractive,
          },
        )}
        onClick={handleClick}
        aria-disabled={isLoading}
      >
        <div
          className={cn(
            'relative h-1 w-full rounded-full bg-white/15 transition-[height,filter,box-shadow] duration-200 ease-out group-hover/seek:h-1.5 motion-reduce:transition-none',
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
                'group-hover/seek:bg-primary h-full rounded-full bg-white transition-[width,background-color] duration-300 ease-out motion-reduce:transition-none',
              )}
              style={{ width: `${clamped}%` }}
            />
          )}
        </div>
        {isInteractive && !isLoading && (
          <div
            className={cn(
              'pointer-events-none absolute top-1/2 z-20 size-3 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white opacity-0 shadow-md transition-[opacity,transform,left] duration-300 ease-out group-hover/seek:scale-100 group-hover/seek:opacity-100 motion-reduce:transition-none',
            )}
            style={{ left: `${clamped}%` }}
          />
        )}
      </div>
      <span className="text-foreground-secondary min-w-[38px] text-left text-[11px] font-medium tabular-nums">
        {formatTimeSeconds(-Math.abs(remainingSeconds))}
      </span>
    </div>
  );
};
