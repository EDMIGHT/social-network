import React from 'react';

import { ResponsePost } from '@/types/post.types';

import PostItem from './PostItem';

interface PostsProps {
  posts: ResponsePost[] | undefined;
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const postsComponents = posts ? (
    posts.map((post) => <PostItem key={post.id} {...post} />)
  ) : (
    <div>no posts found in database</div>
  );

  return <div className='flex flex-col gap-2'>{postsComponents}</div>;
};

export default Posts;
