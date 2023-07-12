import debounce from 'lodash.debounce';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useGetTagByNameMutation } from '@/services/tags.service';
import { Tag as ITag } from '@/types/tag.types';

import Tag from './Tag';

interface TagSearchProps {
  onClickTag: any;
}

const TagSearch: FC<TagSearchProps> = ({ onClickTag }) => {
  const [localText, setLocalText] = useState<string>('');

  const [getTagsByName, { data, isSuccess }] = useGetTagByNameMutation();

  const debounceUpdateSearchValue = useCallback(
    debounce(async (inputText: string) => {
      if (inputText) {
        console.log(inputText);
        await getTagsByName(inputText);
      }
    }, 200),
    []
  );

  const onClickTagCustomization = (tag: ITag) => {
    onClickTag(tag);
    setLocalText('');
  };

  const foundedTags =
    isSuccess &&
    data &&
    data.map((tag) => (
      <Tag key={`tag ${tag.id}`} {...tag} onClick={onClickTagCustomization} />
    ));

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalText(e.target.value ?? '');
    debounceUpdateSearchValue(e.target.value);
  };

  return (
    <div className='relative'>
      <Input
        value={localText}
        onChange={onChangeInput}
        placeholder='enter tag name..'
        name='name'
        id='tag-name'
      />
      {localText && foundedTags && (
        <ul className='absolute top-12 z-20 flex w-full gap-2  rounded bg-black p-3'>
          {foundedTags}
          <li>
            <Link to={`/createTag?name=${localText}`}>
              <Button>create your</Button>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default TagSearch;
