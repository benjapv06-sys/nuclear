import {
  BoomBox,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
} from 'lucide-react';
import { FC } from 'react';

import { RepeatMode } from '@nuclearplayer/model';

import { Button } from '..';
import { cn } from '../../utils';
import { Tooltip } from '../Tooltip';

type PlayerBarControlsLabels = {
  shuffleOn?: string;
  shuffleOff?: string;
  repeatOff?: string;
  repeatAll?: string;
  repeatOne?: string;
  discoveryOn?: string;
  discoveryOff?: string;
};

const REPEAT_LABEL_KEY: Record<RepeatMode, keyof PlayerBarControlsLabels> = {
  off: 'repeatOff',
  all: 'repeatAll',
  one: 'repeatOne',
};

const activeControlClass =
  'relative after:absolute after:right-1 after:bottom-1 after:size-1.5 after:rounded-full after:bg-foreground after:content-[""] after:shadow-[0_0_0_2px_var(--primary)]';

type PlayerBarControlsProps = {
  isPlaying?: boolean;
  isShuffleActive?: boolean;
  isDiscoveryActive?: boolean;
  repeatMode?: RepeatMode;
  labels: PlayerBarControlsLabels;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffleToggle: () => void;
  onRepeatToggle: () => void;
  onDiscoveryToggle?: () => void;
  showDiscovery: boolean;
  onEqualizerClick?: () => void;
  isEqualizerActive?: boolean;
  className?: string;
};

export const PlayerBarControls: FC<PlayerBarControlsProps> = ({
  isPlaying = false,
  isShuffleActive = false,
  isDiscoveryActive = false,
  repeatMode = 'off',
  labels,
  onPlayPause,
  onNext,
  onPrevious,
  onShuffleToggle,
  onRepeatToggle,
  onDiscoveryToggle,
  showDiscovery,
  onEqualizerClick,
  isEqualizerActive = false,
  className = '',
}) => (
  <div className={cn('flex items-center justify-center gap-2', className)}>
    <Tooltip
      content={isShuffleActive ? labels?.shuffleOn : labels?.shuffleOff}
      side="top"
    >
      <Button
        size="icon"
        variant={isShuffleActive ? 'default' : 'text'}
        onClick={onShuffleToggle}
        data-testid="player-shuffle-button"
        className={cn(
          isShuffleActive && 'scale-105',
          isShuffleActive && activeControlClass,
        )}
      >
        <Shuffle
          size={16}
          className="transition-transform duration-150 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </Button>
    </Tooltip>
    <Button size="icon" variant="text" onClick={onPrevious} className="group">
      <SkipBack
        size={16}
        className="transition-transform duration-150 group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      />
    </Button>
    <Button
      size="icon"
      onClick={onPlayPause}
      data-testid={isPlaying ? 'player-pause-button' : 'player-play-button'}
      className={cn(
        'group size-11 hover:scale-105 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100',
        isPlaying && 'animate-pulse-play',
      )}
    >
      {isPlaying ? (
        <Pause
          size={16}
          className="transition-transform duration-150 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        <Play
          size={16}
          className="translate-x-px transition-transform duration-150 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      )}
    </Button>
    <Button size="icon" variant="text" onClick={onNext} className="group">
      <SkipForward
        size={16}
        className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      />
    </Button>
    <Tooltip content={labels?.[REPEAT_LABEL_KEY[repeatMode]]} side="top">
      <Button
        size="icon"
        variant={repeatMode !== 'off' ? 'default' : 'text'}
        onClick={onRepeatToggle}
        data-testid="player-repeat-button"
        className={cn(
          repeatMode !== 'off' && 'scale-105',
          repeatMode !== 'off' && activeControlClass,
        )}
      >
        {repeatMode === 'one' && <Repeat1 size={16} />}
        {repeatMode !== 'one' && <Repeat size={16} />}
      </Button>
    </Tooltip>
    {onEqualizerClick && (
      <Tooltip content="Ecualizador" side="top">
        <Button
          size="icon"
          variant={isEqualizerActive ? 'default' : 'text'}
          onClick={onEqualizerClick}
          className={cn(
            isEqualizerActive && 'scale-105',
            isEqualizerActive && activeControlClass,
          )}
        >
          <SlidersHorizontal size={16} />
        </Button>
      </Tooltip>
    )}
    {showDiscovery && (
      <Tooltip
        content={isDiscoveryActive ? labels?.discoveryOn : labels?.discoveryOff}
        side="top"
      >
        <Button
          size="icon"
          variant={isDiscoveryActive ? 'default' : 'text'}
          onClick={onDiscoveryToggle}
          data-testid="player-discovery-button"
          className={cn(
            isDiscoveryActive && 'scale-105',
            isDiscoveryActive && activeControlClass,
          )}
        >
          <BoomBox size={16} />
        </Button>
      </Tooltip>
    )}
  </div>
);
