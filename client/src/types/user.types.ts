export interface User {
  id: string;
  login: string;
  img: string;
  name: string | null;
  email: string | null;
  password: string;
  createdAt: Date;
}

export type IUserWithLikedPosts = Omit<User, 'password'> & {
  likedPosts: {
    id: string;
  }[];
};

export type IJoinedUser = Pick<User, 'id' | 'name' | 'login' | 'img'>;

export type IResponseUser = IUserWithLikedPosts;

export interface IResponseAuth {
  accessToken: string;
  refreshToken: string;
  user: IResponseUser;
}
