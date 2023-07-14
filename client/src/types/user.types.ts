import { IPagination } from '@/services/api';

export interface User {
  id: string;
  login: string;
  img: string;
  name: string | null;
  email: string | null;
  password: string;
  createdAt: Date;
}

export type IUserWithData = Omit<User, 'password'> & {
  likedPosts: {
    id: string;
  }[];
  followers: {
    login: string;
  }[];
  following: {
    login: string;
  }[];
};

export type IJoinedUser = Pick<User, 'id' | 'name' | 'login' | 'img'>;

export interface IJoinedUsersWithPagination extends IPagination {
  users: IJoinedUser[];
}

export interface IFollowingWithPagination extends IPagination {
  following: IJoinedUser[];
}

export interface IFollowersWithPagination extends IPagination {
  followers: IJoinedUser[];
}
