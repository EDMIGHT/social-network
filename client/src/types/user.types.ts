export interface User {
  id: string;
  login: string;
  img: string;
  name: string | null;
  email: string | null;
  password: string;
  createdAt: Date;
}

export type UserWithLikedPosts = Omit<User, 'password'> & {
  likedPosts: {
    id: string;
  }[];
};

export type IncludedUser = Pick<User, 'id' | 'name' | 'login' | 'img'>;

export type ResponseUser = UserWithLikedPosts;
