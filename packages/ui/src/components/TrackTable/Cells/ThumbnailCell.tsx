import { CellContext } from '@tanstack/react-table';

import { Artwork, Track } from '@nuclearplayer/model';

export const ThumbnailCell = <T extends Track>({
  getValue,
}: CellContext<T, Artwork>) => {
  return (
    <td className="w-10 text-center">
      <div className="flex w-full justify-center">
        <div className="border-border/60 bg-background relative size-10 min-w-10 overflow-hidden rounded-sm border">
          <img
            className="size-full object-cover transition-[filter,transform] duration-200 ease-out group-focus-within/track-row:scale-105 group-focus-within/track-row:brightness-110 group-hover/track-row:scale-105 group-hover/track-row:brightness-110 motion-reduce:transition-none motion-reduce:group-focus-within/track-row:scale-100 motion-reduce:group-hover/track-row:scale-100"
            src={getValue()?.url}
            alt=""
          />
          <div className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-white/20 transition-opacity duration-150 ring-inset group-focus-within/track-row:opacity-100 group-hover/track-row:opacity-100 motion-reduce:transition-none" />
        </div>
      </div>
    </td>
  );
};
