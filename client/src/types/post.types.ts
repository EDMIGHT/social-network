import { Tag } from './tag.types';
import { IncludedUser, User } from './user.types';

export interface Post {
  id: string;
  text: string | null;
  img: string | null;
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
}

export type ResponsePost = Post & {
  tags: Tag[];
  user: IncludedUser;
  likedBy: IncludedUser[];
};

export interface CreatePostQuery {
  accessToken: string;
  text: string;
  tags: string;
  img?: string;
}
