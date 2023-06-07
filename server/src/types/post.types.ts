import { Post } from '@prisma/client';

export interface GetPostArg {
  page: number;
  limit: number;
  sort: string;
  order: string;
  tags: string;
}

export type CreatePost = Pick<Post, 'title' | 'text' | 'img' | 'authorId'> & {
  tags: string[];
};
