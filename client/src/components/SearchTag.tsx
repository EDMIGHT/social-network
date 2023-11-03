import { FC, useState } from 'react';

import CreateTagForm from '@/components/form/CreateTagForm';
import Tag from '@/components/Tag';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useInputDebounce } from '@/hooks/useInputDebounce';
import { useGetTagByNameMutation } from '@/services/tags.service';
import { Tag as ITag } from '@/types/tag.types';

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
        name='search-tag'
      />
      {localText && foundedTags && (
        <div className='absolute top-12 z-20 w-full rounded bg-background p-3'>
          {isActiveCreateTag ? (
            <CreateTagForm name={localText} callback={onCreateTag} />
          ) : (
            <ul className='flex gap-2'>
              {foundedTags}
              <li>
                <Button type='button' onClick={onClickCreateTag}>
                  create your
                </Button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchTag;
