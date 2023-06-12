import { Tag } from './tag.types';

export interface Post {
  id: string;
  title: string;
  text: string;
  img: string | null;
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
  likedById: string | null;
}

export type ResponsePost = Post & {
  tags: Tag[];
};
