import { FC } from 'react';

import { Tag } from '@/types/tag.types';

import SearchTag from './SearchTag';
import Tags from './Tags';

interface ITagsControlProps {
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const TagsControl: FC<ITagsControlProps> = ({ selectedTags, setSelectedTags }) => {
  const onClickAddTag = (tag: Tag) => {
    const existTag = selectedTags.some((selectedTag) => selectedTag.id === tag.id);
    if (!existTag) {
      setSelectedTags((prev) => [...prev, tag]);
    } else {
      // TODO алерт про уже наличие такого тега
    }
  };
  const onClickRemoveTag = (tag: Tag) => {
    setSelectedTags((prev) => prev.filter((prevTag) => prevTag.id !== tag.id));
  };

  return (
    <div className='flex flex-col gap-2'>
      <SearchTag onClickTag={onClickAddTag} />
      {selectedTags.length > 0 && (
        <Tags data={selectedTags} className='p-0' onClick={onClickRemoveTag} />
      )}
    </div>
  );
};

export default TagsControl;
