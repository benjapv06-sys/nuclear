import { CellContext } from '@tanstack/react-table';

import { Track } from '@nuclearplayer/model';

export const TextCell = <T extends Track>({
  getValue,
}: CellContext<T, string | number | undefined>) => (
  <td className="cursor-default truncate px-2">
    <div className="group-hover/track-row:text-foreground group-focus-within/track-row:text-foreground truncate transition-colors duration-150 motion-reduce:transition-none">
      {getValue()}
    </div>
  </td>
);
