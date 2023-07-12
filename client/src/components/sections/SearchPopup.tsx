import { ChangeEvent, FC, useState } from 'react';

import Input from '@/components/ui/Input';

const SearchPopup: FC = (props) => {
  const [localText, setLocalText] = useState('');

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalText(e.target.value);
  };

  return (
    <div>
      <Input
        name='text'
        id='search-text'
        placeholder='write user login here..'
        value={localText}
        onChange={onChangeText}
      />
    </div>
  );
};

export default SearchPopup;
