import { FC, useState } from 'react';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useInputDebounce } from '@/hooks/useInputDebounce';
import { useGetTagByNameMutation } from '@/services/tags.service';
import { Tag as ITag } from '@/types/tag.types';

import CreateTag from './form/CreateTag';
import Tag from './Tag';

interface SearchTagProps {
  onClickTag: (tag: ITag) => void;
}

const SearchTag: FC<SearchTagProps> = ({ onClickTag }) => {
  const [isActiveCreateTag, setIsActiveCreateTag] = useState(false);

  const [getTagsByName, { data, isSuccess }] = useGetTagByNameMutation();

  const [localText, onChangeInput, setLocalText] = useInputDebounce({
    callback: getTagsByName,
  });

  const onClickTagCustomization = (tag: ITag) => {
    onClickTag(tag);
    setLocalText('');
  };
  const onClickCreateTag = () => {
    setIsActiveCreateTag(true);
  };
  const onCreateTag = (tag: ITag) => {
    onClickTag(tag);
    setLocalText('');
    setIsActiveCreateTag(false);
  };

  const foundedTags =
    isSuccess &&
    data &&
    data.tags.map((tag) => (
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
        <ul className='absolute top-12 z-20 flex w-full gap-2  rounded bg-background p-3'>
          {foundedTags}
          <li>
            {isActiveCreateTag ? (
              <CreateTag name={localText} callback={onCreateTag} />
            ) : (
              <Button onClick={onClickCreateTag}>create your</Button>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default SearchTag;
