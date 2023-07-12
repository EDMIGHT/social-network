import { Comment } from './comment.types';
import { Post } from './post.types';
import { Tag } from './tag.types';
import { IJoinedUser, IUserWithLikedPosts } from './user.types';

export interface IBadResponse {
  message: string;
}

export interface IResponsePostsPagination {
  posts: IResponsePost[];
  currentPage: number;
  totalPages: number;
}
export type IResponseUser = IUserWithLikedPosts;

export interface IResponseAuth {
  accessToken: string;
  refreshToken: string;
  user: IResponseUser;
}

export interface IResponseProfile extends IResponseUser {
  _count: {
    createdPosts: number;
    likedPosts: number;
    followers: number;
    following: number;
  };
}

export type IResponsePost = Post & {
  comments: Comment[];
  tags: Tag[];
  user: IJoinedUser;
  likedBy: IJoinedUser[];
};

export const isBadResponse = (arg: unknown): arg is IBadResponse => {
  if (arg && typeof arg === 'object') {
    return 'message' in arg;
  }
  return false;
};
