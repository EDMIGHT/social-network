import React from 'react';

import searchIcon from '@/assets/icons/search.svg';

interface SearchProps {
  placeholder: string;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ placeholder, className }) => {
  return (
    <label
      htmlFor='search'
      className={`flex cursor-pointer rounded bg-light-bg-main ${className} relative text-secondary-text`}
    >
      <img src={searchIcon} alt='search' className='absolute left-0.5 top-0 max-h-full p-1' />
      <input
        id='search'
        name='search'
        placeholder={placeholder}
        className='w-full cursor-pointer rounded border-2 border-transparent bg-transparent p-3 pl-10 transition-all hover:border-activity focus:border-activity focus:outline-none active:border-activity'
      />
    </label>
  );
};

export default Search;
