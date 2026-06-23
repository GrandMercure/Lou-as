import { Package } from 'lucide-react';
import { cn } from '../../utils/helpers';

const SIZES = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
  xl: 'h-28 w-28',
};

/**
 * Thumbnail quadrada 1:1 para produtos do estoque.
 * TODO: Imagens virão do Firebase Storage no futuro
 */
export default function ItemThumbnail({ src, alt, size = 'md', className }) {
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-lg border border-mercure-border bg-white',
        'aspect-square',
        SIZES[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover aspect-square"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-mercure-surface text-mercure-muted">
          <Package className="h-1/2 w-1/2" />
        </div>
      )}
    </div>
  );
}
