import { CassetteTape } from 'lucide-react';
import { FC, ReactNode } from 'react';

import { cn } from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';
import { ImageReveal } from '../ImageReveal';

type CardProps = {
  src?: string;
  image?: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
  imageReveal?: boolean;
};

export const Card: FC<CardProps> = ({
  src,
  image,
  title,
  subtitle,
  className,
  onClick,
  imageReveal = true,
}) => (
  <Button
    data-testid="card"
    size="flexible"
    className={cn(
      'group/card flex w-42 flex-col items-stretch gap-2 p-2 text-left transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 focus-visible:-translate-y-1.5',
      className,
    )}
    onClick={onClick}
  >
    <Box
      variant="primary"
      shadow="none"
      className="relative aspect-square w-full items-center justify-center overflow-hidden p-0"
    >
      {image ?? (
        <ImageReveal
          enabled={imageReveal}
          src={src}
          alt={title}
          className="absolute inset-0"
          imgClassName="h-full w-full object-cover transition-transform duration-500 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] group-hover/card:scale-110 group-focus-visible/card:scale-110 motion-reduce:transition-none motion-reduce:group-hover/card:scale-100 motion-reduce:group-focus-visible/card:scale-100"
          placeholder={
            <CassetteTape
              size={96}
              absoluteStrokeWidth
              className="opacity-20"
            />
          }
        />
      )}
    </Box>

    {(title || subtitle) && (
      <div className="min-w-0">
        {title && (
          <div
            data-testid="card-title"
            className="text-foreground group-hover/card:text-primary truncate text-sm font-bold transition-colors duration-300"
          >
            {title}
          </div>
        )}
        {subtitle && (
          <div className="text-foreground truncate text-xs opacity-60">
            {subtitle}
          </div>
        )}
      </div>
    )}
  </Button>
);
