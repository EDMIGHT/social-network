import debounce from 'lodash.debounce';
import { ChangeEvent, forwardRef, useCallback, useState } from 'react';

import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Overlay from '@/components/ui/Overlay';
import { useSearchUserByLoginMutation } from '@/services/users.service';

import Users from './Users';

interface ISearchPopupProps {
  onClickUser?: any;
}

const SearchPopup = forwardRef<HTMLDivElement, ISearchPopupProps>(({ onClickUser }, ref) => {
  const [localText, setLocalText] = useState('');
  const [searchUsers, { data, isSuccess }] = useSearchUserByLoginMutation();

  const debouncedSearch = useCallback(
    debounce(async (inputText: string) => {
      if (inputText) {
        await searchUsers({ login: inputText, page: 1 });
      }
    }, 200),
    []
  );

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalText(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <>
      <Overlay ref={ref} />
      <div className='fixed left-[50vw] top-[25vh] flex w-[500px] -translate-x-1/2 flex-col gap-2'>
        <Card>
          <Input
            name='text'
            id='search-text'
            placeholder='write user login here..'
            value={localText}
            onChange={onChangeText}
            focus
          />
        </Card>
        {localText.length > 0 && isSuccess && data && data.users.length > 0 && (
          <Card>
            <Users users={data.users} onClickUser={onClickUser} />
          </Card>
        )}
      </div>
    </>
  );
});

export default SearchPopup;
