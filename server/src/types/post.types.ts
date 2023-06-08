import { Post } from '@prisma/client';

export interface GetPostArg {
  userId?: string;
  page: number;
  limit: number;
  sort: string;
  order: string;
  tags: string;
}

export type CreatePost = Pick<Post, 'title' | 'text' | 'img' | 'userId'> & {
  tags: string[];
};
