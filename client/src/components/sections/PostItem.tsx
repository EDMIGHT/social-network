import React from 'react';

import Typography from '@/components/ui/Typography';
import { Post } from '@/types/post.types';

const PostItem: React.FC<Post> = ({
  id,
  createdAt,
  img,
  likedById,
  text,
  title,
  updatedAt,
  userId,
  viewsCount,
}) => {
  return (
    <div>
      <Typography component='h2' variant='title-2'>
        {title}
      </Typography>
      <Typography component='p' variant='title-2'>
        {text}
      </Typography>
    </div>
  );
};

export default PostItem;
