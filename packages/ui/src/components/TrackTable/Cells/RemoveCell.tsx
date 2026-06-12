import { CellContext } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';

import { Track } from '@nuclearplayer/model';

import { Button } from '../../Button';

type RemoveCellMeta = {
  onRemove: (track: Track, index: number) => void;
};

export const RemoveCell = <T extends Track>({
  row,
  table,
}: CellContext<T, unknown>) => {
  const meta = table.options.meta as RemoveCellMeta;
  const track = row.original;

  return (
    <td className="w-10 text-center">
      <Button
        size="icon-sm"
        variant="text"
        onClick={(e) => {
          e.stopPropagation();
          meta.onRemove(track, row.index);
        }}
        aria-label="Remove from list"
        className="opacity-45 transition-[opacity,transform,background-color] duration-150 ease-out group-focus-within/track-row:opacity-100 group-hover/track-row:opacity-100 hover:scale-105 hover:opacity-100 motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        <Trash2
          size={16}
          className="text-foreground-secondary group-hover/track-row:text-foreground transition-colors duration-150"
        />
      </Button>
    </td>
  );
};
