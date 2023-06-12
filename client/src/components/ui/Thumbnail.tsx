import React from 'react';

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
      className={`h-full w-full rounded object-cover ${className}`}
    />
  );
};

export default Thumbnail;
