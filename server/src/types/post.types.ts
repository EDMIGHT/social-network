import { Comment, Post, Tag } from '@prisma/client';

import { IncludedUser } from './user.types';

export type PostWithData = Post & {
  likedBy: IncludedUser[];
  comments: Comment[];
  tags: Tag[];
  user: IncludedUser;
};

export interface GetPostArg {
  login?: string;
  page: number;
  limit: number;
  sort: string;
  order: string;
  tags: string[];
}

export type CreatePost = Pick<Post, 'text' | 'img' | 'userId'> & {
  tags: string[];
};
