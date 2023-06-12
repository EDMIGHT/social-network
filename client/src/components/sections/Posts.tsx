import React from 'react';

import { ResponsePost } from '@/types/post.types';

import PostItem from './PostItem';

interface PostsProps {
  posts: ResponsePost[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const postsComponents = posts.map((post) => <PostItem key={post.id} {...post} />);
  return <div className='flex flex-col gap-4'>{postsComponents}</div>;
};

export default Posts;
