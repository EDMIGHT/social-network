import { Post } from '@prisma/client';

import { IncludedUser } from './user.types';

export type PostWithUser = Post & {
  likedBy: IncludedUser[];
};

export interface GetPostArg {
  login?: string;
  // page: number;
  offset: number;
  limit: number;
  sort: string;
  order: string;
  // tags: string;
  tags: string[];
}

export type CreatePost = Pick<Post, 'text' | 'img' | 'userId'> & {
  tags: string[];
};
