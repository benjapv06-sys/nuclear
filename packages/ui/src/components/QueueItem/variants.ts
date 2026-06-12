import { cva } from 'class-variance-authority';

export const queueItemVariants = cva(
  'feedback-surface group hover:shadow-shadow relative flex items-center gap-2 overflow-hidden ring-offset-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] outline-none hover:-translate-y-0.5 hover:brightness-105 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98] active:shadow-none motion-reduce:transition-none motion-reduce:hover:transform-none',
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
