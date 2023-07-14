import { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import SearchPopup from './SearchPopup';
import SearchTrigger from './SearchTrigger';

const Search: FC = () => {
  const [isActiveSearchPopup, setIsActiveSearchPopup] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (searchRef && searchRef.current && e.composedPath().includes(searchRef.current)) {
        setIsActiveSearchPopup(false);
      }
    };

    document.body.addEventListener('click', onClickOutside);
    return () => document.body.removeEventListener('click', onClickOutside);
  }, []);

  const onClickSearchTrigger = () => {
    setIsActiveSearchPopup(true);
  };
  const onClickUser = () => {
    setIsActiveSearchPopup(false);
  };

  return (
    <div>
      <SearchTrigger
        placeholder='search user..'
        onClick={onClickSearchTrigger}
        className='h-full'
      />
      {isActiveSearchPopup &&
        createPortal(<SearchPopup ref={searchRef} onClickUser={onClickUser} />, document.body)}
    </div>
  );
};

export default Search;
