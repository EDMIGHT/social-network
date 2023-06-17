import { Post } from '@prisma/client';

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
