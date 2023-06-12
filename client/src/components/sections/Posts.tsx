import React from 'react';

import { Post } from '@/types/post.types';

import PostItem from './PostItem';

interface PostsProps {
  posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  const postsComponents = posts.map((post) => <PostItem key={post.id} {...post} />);
  return <div>{postsComponents}</div>;
};

export default Posts;
