import { FC } from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useInputDebounce } from '@/hooks/useInputDebounce';
import { useGetTagByNameMutation } from '@/services/tags.service';
import { Tag as ITag } from '@/types/tag.types';

import Tag from './Tag';

interface SearchTagProps {
  onClickTag: any;
}

const SearchTag: FC<SearchTagProps> = ({ onClickTag }) => {
  const [getTagsByName, { data, isSuccess }] = useGetTagByNameMutation();

  const [localText, onChangeInput, setLocalText] = useInputDebounce({
    callback: getTagsByName,
  });

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

export default SearchTag;
