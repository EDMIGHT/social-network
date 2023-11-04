import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { addTag } from '@/store/slices/options.slice';
import { IResponsePost } from '@/types/responses.types';
import { Tag } from '@/types/tag.types';

import PostHeader from './PostHeader';
import PostMenu from './PostMenu';
import Tags from './Tags';

const PostItem: React.FC<IResponsePost> = ({
  id,
  createdAt,
  img,
  text,
  updatedAt,
  viewsCount,
  user,
  comments,
  tags,
  likedBy,
}) => {
  const dispatch = useAppDispatch();

  const onClickTag = (tag: Tag) => {
    dispatch(addTag(tag));
  };

  return (
    <li>
      <Card className='flex flex-col gap-2 '>
        <PostHeader id={id} createdAt={createdAt} updatedAt={updatedAt} user={user} />
        <Tags data={tags} className='p-0' onClick={onClickTag} />
        <Link to={`/post/${id}`}>
          {img && (
            <div className='h-96 cursor-pointer bg-black'>
              <img src={img} alt={user.login} className='mx-auto h-full object-cover' />
            </div>
          )}
          <Typography component='p' variant='text'>
            {text}
          </Typography>
        </Link>

        <PostMenu id={id} likedBy={likedBy} comments={comments} viewsCount={viewsCount} />
      </Card>
    </li>
  );
};

export default PostItem;
