import { forwardRef } from 'react';

import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Overlay from '@/components/ui/Overlay';
import { useInputDebounce } from '@/hooks/useInputDebounce';
import { useSearchUserByLoginMutation } from '@/services/users.service';

import Users from './Users';

interface ISearchPopupProps {
  onClickUser?: any;
}

const SearchPopup = forwardRef<HTMLDivElement, ISearchPopupProps>(({ onClickUser }, ref) => {
  const [searchUsers, { data, isSuccess }] = useSearchUserByLoginMutation();

  const [localText, onChangeInput] = useInputDebounce({
    callback: (login) => searchUsers({ login }),
  });

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
            onChange={onChangeInput}
            focus
          />
        </Card>
        {localText.length > 0 && isSuccess && data && data.users.length > 0 && (
          <Card className='max-h-[300px] overflow-auto'>
            <Users users={data.users} onClickUser={onClickUser} />
          </Card>
        )}
      </div>
    </>
  );
});

export default SearchPopup;
