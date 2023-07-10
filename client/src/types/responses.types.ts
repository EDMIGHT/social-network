import { Comment } from './comment.types';
import { Post } from './post.types';
import { Tag } from './tag.types';
import { IJoinedUser, IUserWithLikedPosts } from './user.types';

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
  createdPosts: Post[];
}

export type IResponsePost = Post & {
  comments: Comment[];
  tags: Tag[];
  user: IJoinedUser;
  likedBy: IJoinedUser[];
};
