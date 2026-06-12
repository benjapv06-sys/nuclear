import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, Row } from '@tanstack/react-table';

import { Track } from '@nuclearplayer/model';

import { cn } from '../../utils';

type SortableRowProps<T extends Track = Track> = {
  row: Row<T>;
  itemId: string;
  isReorderable?: boolean;
  style?: React.CSSProperties;
};

export function SortableRow<T extends Track = Track>({
  row,
  itemId,
  isReorderable = false,
  style: externalStyle,
}: SortableRowProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: itemId,
    disabled: !isReorderable,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...externalStyle,
  };

  return (
    <tr
      data-testid="track-row"
      ref={setNodeRef}
      style={style}
      className={cn(
        'border-border bg-background-secondary group group/track-row hover:bg-foreground/[0.04] focus-within:bg-foreground/[0.05] border-b-(length:--border-width) transition-[background-color,box-shadow,filter,transform] duration-150 ease-out outline-none select-none focus-within:shadow-[inset_3px_0_0_var(--primary)] hover:shadow-[inset_3px_0_0_var(--primary)] motion-reduce:transition-none',
        {
          'hover:-translate-y-px': !isDragging,
          'bg-primary shadow-shadow z-50 scale-[1.01]': isDragging,
          'cursor-grab': isReorderable,
        },
      )}
      {...attributes}
      {...listeners}
    >
      {row.getVisibleCells().map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </tr>
  );
}

type CellProps<T extends Track> = {
  cell: ReturnType<Row<T>['getVisibleCells']>[number];
};

const Cell = <T extends Track>({ cell }: CellProps<T>) => {
  return flexRender(cell.column.columnDef.cell, cell.getContext());
};
