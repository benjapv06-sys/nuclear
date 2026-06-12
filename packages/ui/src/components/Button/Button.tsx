import { Button as HeadlessButton } from '@headlessui/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '../../utils';

const buttonVariants = cva(
  'feedback-surface active:translate-x-shadow-x active:translate-y-shadow-y inline-flex cursor-pointer items-center overflow-hidden rounded-md whitespace-nowrap transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:scale-[0.98] active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none motion-reduce:hover:transform-none motion-reduce:active:transform-none',
  {
    variants: {
      variant: {
        default:
          'text-foreground bg-primary border-border shadow-shadow hover:translate-x-shadow-x hover:translate-y-shadow-y border-(length:--border-width) hover:shadow-none hover:brightness-105 active:brightness-95',
        secondary:
          'border-border shadow-shadow hover:translate-x-shadow-x hover:translate-y-shadow-y bg-background text-foreground border-(length:--border-width) hover:shadow-none hover:brightness-105 active:brightness-95',
        tertiary:
          'border-border shadow-shadow hover:translate-x-shadow-x hover:translate-y-shadow-y bg-background-secondary text-foreground border-(length:--border-width) hover:shadow-none hover:brightness-105 active:brightness-95',
        noShadow:
          'text-foreground bg-primary border-border hover:shadow-shadow border-(length:--border-width) hover:-translate-y-0.5 hover:brightness-105 active:brightness-95',
        text: 'text-foreground bg-transparent hover:-translate-y-0.5 hover:bg-black/5 active:bg-black/10',
        ghost:
          'hover:shadow-shadow border border-current bg-transparent hover:-translate-y-0.5 hover:bg-black/10',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        xs: 'h-8 px-2 text-sm',
        lg: 'h-11 px-8',
        icon: 'size-10 justify-center',
        'icon-sm': 'size-8 justify-center',
        flexible: 'h-auto',
      },
      intent: {
        danger: 'bg-accent-red',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { variant, size, intent, className, children, type, ...rest },
  ref,
) {
  return (
    <HeadlessButton
      as="button"
      ref={ref}
      className={cn(buttonVariants({ variant, size, intent, className }))}
      type={type ?? 'button'}
      {...rest}
    >
      {children}
    </HeadlessButton>
  );
});
