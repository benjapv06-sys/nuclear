import { cva } from 'class-variance-authority';

export const queueItemVariants = cva(
  'feedback-surface group hover:shadow-shadow relative flex items-center gap-2 overflow-hidden ring-offset-white transition-[transform,box-shadow,background-color,border-color,opacity,filter] duration-150 ease-out outline-none hover:-translate-y-0.5 hover:brightness-105 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:translate-y-0 active:shadow-none motion-reduce:transition-none motion-reduce:hover:transform-none',
  {
    variants: {
      status: {
        idle: '',
        loading: 'opacity-70',
        error: '',
        success: '',
      },
      isCurrent: {
        true: 'bg-primary shadow-shadow',
        false: '',
      },
      isCollapsed: {
        true: 'h-9 w-9 justify-center p-0',
        false: 'w-full p-0',
      },
    },
    defaultVariants: {
      status: 'idle',
      isCurrent: false,
      isCollapsed: false,
    },
  },
);
