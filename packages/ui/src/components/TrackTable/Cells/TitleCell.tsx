import { CellContext } from '@tanstack/react-table';
import { EllipsisVertical, Plus } from 'lucide-react';
import { FC, forwardRef } from 'react';

import { Track } from '@nuclearplayer/model';

import { Button } from '../../Button';
import { useTrackTableContext } from '../TrackTableContext';
import { ContextMenuWrapperProps } from '../types';

type TitleCellMeta = {
  displayQueueControls?: boolean;
  onAddToQueue?: (track: Track) => void;
  ContextMenuWrapper?: FC<ContextMenuWrapperProps>;
};

type AddToQueueButtonProps = {
  onClick: () => void;
};

const AddToQueueButton: FC<AddToQueueButtonProps> = ({ onClick }) => (
  <Button
    data-testid="add-to-queue-button"
    size="icon-sm"
    variant="text"
    className="translate-x-1 opacity-0 transition-[opacity,transform,background-color] duration-150 ease-out group-focus-within/track-row:translate-x-0 group-focus-within/track-row:opacity-100 group-hover/track-row:translate-x-0 group-hover/track-row:opacity-100 motion-reduce:transition-none"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    aria-label="Add to queue"
  >
    <Plus size={16} />
  </Button>
);

const ContextMenuButton = forwardRef<HTMLElement>(
  function ContextMenuButton(props, ref) {
    return (
      <Button
        {...props}
        ref={ref}
        data-testid="track-context-menu-button"
        size="icon-sm"
        variant="text"
        className="translate-x-1 opacity-0 transition-[opacity,transform,background-color] duration-150 ease-out group-focus-within/track-row:translate-x-0 group-focus-within/track-row:opacity-100 group-hover/track-row:translate-x-0 group-hover/track-row:opacity-100 motion-reduce:transition-none"
        onClick={(e) => e.stopPropagation()}
        aria-label="Track options"
      >
        <EllipsisVertical size={16} />
      </Button>
    );
  },
);

export const TitleCell = <T extends Track>({
  getValue,
  row,
  table,
}: CellContext<T, string | number | undefined>) => {
  const meta = table.options.meta as TitleCellMeta | undefined;
  const { actions } = useTrackTableContext<T>();
  const showControls = meta?.displayQueueControls;
  const ContextMenuWrapper = meta?.ContextMenuWrapper;
  const track = row.original;
  const hasAddToQueue = Boolean(meta?.onAddToQueue);
  const hasContextMenu = Boolean(ContextMenuWrapper);
  const hasActions = hasAddToQueue || hasContextMenu;

  return (
    <td className="truncate px-2">
      <div className="flex items-center justify-between gap-2">
        <button
          className="hover:text-primary min-w-0 flex-1 cursor-pointer truncate rounded-sm text-left transition-[color,text-decoration-color] duration-150 hover:underline hover:decoration-current focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none"
          onClick={(e) => {
            e.stopPropagation();
            actions.onPlayNow?.(track);
          }}
        >
          {getValue()}
        </button>
        {showControls && hasActions && (
          <div className="flex items-center gap-1">
            {hasAddToQueue && (
              <AddToQueueButton onClick={() => meta?.onAddToQueue?.(track)} />
            )}
            {ContextMenuWrapper && (
              <ContextMenuWrapper track={track}>
                <ContextMenuButton />
              </ContextMenuWrapper>
            )}
          </div>
        )}
      </div>
    </td>
  );
};
