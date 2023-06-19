import React from 'react';

import { ResponsePost } from '@/types/post.types';

import PostItem from './PostItem';
import PostsEmpty from './PostsEmpty';

interface PostsProps {
  posts: ResponsePost[] | undefined;
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const postsComponents = posts?.length ? (
    posts.map((post) => <PostItem key={post.id} {...post} />)
  ) : (
    <PostsEmpty />
  );

  return <div className='flex flex-col gap-2'>{postsComponents}</div>;
};

export default Posts;
