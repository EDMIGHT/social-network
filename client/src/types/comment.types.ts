import { IJoinedUser } from './user.types';

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date | null;
  postId: string;
  userId: string;
}

export type ICommentWithUser = Comment & {
  user: IJoinedUser;
};
