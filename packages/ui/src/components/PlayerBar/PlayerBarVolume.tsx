import { Volume2 } from 'lucide-react';
import { FC } from 'react';

import { Button, Slider } from '..';
import { cn } from '../../utils';

type PlayerBarVolumeProps = {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
};

export const PlayerBarVolume: FC<PlayerBarVolumeProps> = ({
  value,
  defaultValue,
  onValueChange,
  disabled,
  className = '',
}) => {
  return (
    <div className={cn('group/volume flex items-center gap-2', className)}>
      <Button size="icon" variant="text" disabled={disabled} className="group">
        <Volume2
          size={16}
          className="transition-transform duration-150 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </Button>
      <div
        className="w-24 transition-[opacity,filter] duration-150 group-hover/volume:brightness-110 motion-reduce:transition-none"
        data-testid="player-volume-slider"
      >
        <Slider
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          showValue={false}
          showFooter={false}
        />
      </div>
    </div>
  );
};
