import React from 'react';

import { cn } from '@/utils/cn';

interface ThumbnailProps {
  imgURL: string;
  alt: string;
  className?: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ imgURL, alt, className }) => {
  return (
    <img
      src={imgURL}
      alt={alt}
      className={cn('h-full w-full rounded object-contain', className)}
    />
  );
};

export default Thumbnail;
