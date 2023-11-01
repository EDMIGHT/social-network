import React from 'react';

import searchIcon from '@/assets/icons/search.svg';
import Typography from '@/components/ui/Typography';
import { cn } from '@/utils/cn';

interface SearchProps {
  placeholder: string;
  className?: string;
  onClick?: any;
}

const SearchTrigger: React.FC<SearchProps> = ({ placeholder, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex cursor-pointer border-transparent sm:w-52 pl-10 items-center rounded sm:bg-input relative border-2 sm:border-input text-input-foreground hover:border-primary',
        className
      )}
    >
      <img src={searchIcon} alt='search' className='absolute left-0.5 top-0 max-h-full p-1' />
      <Typography component='span' variant='text' className='hidden sm:block'>
        {placeholder}
      </Typography>
    </button>
  );
};

export default SearchTrigger;
