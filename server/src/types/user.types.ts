import { User } from '@prisma/client';

export type RegisterUser = Pick<User, 'img' | 'email' | 'name' | 'login' | 'password'>;
export type LoginUser = Pick<User, 'login' | 'password'>;
export type ResponseUser = Pick<User, 'id' | 'login' | 'email' | 'img' | 'name' | 'createdAt'>;
export type IncludedUser = Pick<User, 'id' | 'name' | 'login' | 'img'>;

export type UserWithLikedPosts = User & {
  likedPosts: {
    id: string;
  }[];
};

export type UserProfile = User & {
  _count: {
    likedPosts: number;
    createdPosts: number;
    following: number;
    followers: number;
  };
};

export type UserWithFollowing = User & {
  following: {
    login: string;
  }[];
};

export type UserWithData = User & {
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
export type UserWithFollow = User & {
  followers: {
    login: string;
  }[];
  following: {
    login: string;
  }[];
};

// type guards
export const isRegisterUser = (obj: unknown): obj is RegisterUser => {
  return obj !== null && typeof obj === 'object' && 'password' in obj && 'img' in obj;
};

export const isLoginUser = (obj: unknown): obj is LoginUser => {
  return obj !== null && typeof obj === 'object' && 'password' in obj && 'login' in obj;
};
