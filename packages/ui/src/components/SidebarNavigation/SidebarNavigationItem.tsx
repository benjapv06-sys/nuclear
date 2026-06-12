import { Link } from '@tanstack/react-router';
import { FC, ReactNode } from 'react';

import { cn } from '../../utils';
import { Tooltip } from '../Tooltip/Tooltip';
import { useSidebarCompact } from './SidebarCompactContext';

type SidebarNavigationItemProps = {
  icon: ReactNode;
  label: string;
  isSelected?: boolean;
  to?: string;
  onClick?: () => void;
};

const MaybeNavLink: FC<{
  to?: string;
  isSelected?: boolean;
  children: (isSelected: boolean) => ReactNode;
}> = ({ to, isSelected = false, children }) => {
  if (to) {
    return <Link to={to}>{({ isActive }) => children(isActive)}</Link>;
  }
  return <>{children(isSelected)}</>;
};

export const SidebarNavigationItem: FC<SidebarNavigationItemProps> = ({
  icon,
  label,
  isSelected,
  to,
  onClick,
}) => {
  const isCompact = useSidebarCompact();

  return (
    <MaybeNavLink to={to} isSelected={isSelected}>
      {(active) => (
        <Tooltip content={label} side="right" disabled={!isCompact}>
          <div
            role={onClick ? 'button' : undefined}
            onClick={onClick}
            onKeyDown={(event) => {
              if (!onClick || (event.key !== 'Enter' && event.key !== ' ')) {
                return;
              }

              event.preventDefault();
              onClick();
            }}
            tabIndex={onClick ? 0 : undefined}
            data-testid="sidebar-navigation-item"
            className={cn(
              'feedback-surface group/sidebar-item flex w-full items-center overflow-hidden rounded-md border-(length:--border-width) transition-[transform,box-shadow,background-color,border-color] duration-150 ease-out outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:translate-y-0 active:shadow-none motion-reduce:transition-none motion-reduce:hover:transform-none',
              {
                'cursor-pointer': onClick,
                'bg-primary border-border shadow-shadow font-bold': active,
                'hover:bg-background-secondary hover:shadow-shadow border-transparent':
                  !active,
              },
            )}
          >
            <div className="flex size-8 shrink-0 items-center justify-center transition-transform duration-150 ease-out group-hover/sidebar-item:scale-105 motion-reduce:transition-none motion-reduce:group-hover/sidebar-item:scale-100">
              {icon}
            </div>
            <span
              className={cn(
                'text-sm whitespace-nowrap transition-opacity duration-150',
                {
                  'opacity-0': isCompact,
                  'opacity-100': !isCompact,
                },
              )}
            >
              {label}
            </span>
          </div>
        </Tooltip>
      )}
    </MaybeNavLink>
  );
};
