import React from 'react';

import { Post, ResponsePost } from '@/types/post.types';

import Posts from './Posts';

interface PostFeedProps {
  posts: ResponsePost[];
  currentPage: number;
  totalPages: number;
}

const PostFeed: React.FC<PostFeedProps> = ({ posts, currentPage, totalPages }) => {
  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default PostFeed;
