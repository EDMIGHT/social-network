import { IPagination } from '@/services/api';

import { Comment, ICommentWithUser } from './comment.types';
import { Post } from './post.types';
import { Tag } from './tag.types';
import { IJoinedUser, IUserWithData } from './user.types';

export interface IBadResponse {
  error: {
    data: {
      message: string;
    };
  };
}

export interface IBadData {
  message: string;
}

export interface IResponsePostsPagination extends IPagination {
  posts: IResponsePost[];
}
export type IResponseUser = IUserWithData;

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

export interface IResponseCommentsByUser extends IPagination {
  comments: ICommentWithUser[];
}

export interface IResponseTagsWithPagination extends IPagination {
  tags: Tag[];
}

export const isBadData = (arg: unknown): arg is IBadData => {
  if (arg && typeof arg === 'object') {
    return 'message' in arg;
  }
  return false;
};

export const isErrorWithMessage = (response: any): response is IBadResponse => {
  return (
    response?.error !== undefined &&
    response.error.data !== undefined &&
    response.error.data.message !== undefined
  );
};
