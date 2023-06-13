import React from 'react';

import { useGetAllPostsQuery } from '@/store/api/api';

import PostItem from './PostItem';

const Posts: React.FC = () => {
  const { isLoading, isError, isSuccess, data } = useGetAllPostsQuery({}, {});

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  const postsComponents = data?.posts ? (
    data?.posts.map((post) => <PostItem key={post.id} {...post} />)
  ) : (
    <div>no posts found in database</div>
  );

  return <div className='flex flex-col gap-2'>{postsComponents}</div>;
};

export default Posts;
