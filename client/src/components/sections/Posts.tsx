import { useAutoAnimate } from '@formkit/auto-animate/react';
import React from 'react';

import { IResponsePost } from '@/types/responses.types';

import PostItem from './PostItem';
import PostsEmpty from './PostsEmpty';

interface PostsProps {
  posts: IResponsePost[] | undefined;
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [parent] = useAutoAnimate();

  const postsComponents = posts?.length ? (
    <ul ref={parent} className='flex flex-col gap-2'>
      {posts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </ul>
  ) : (
    <PostsEmpty />
  );

  return postsComponents;
};

export default Posts;
