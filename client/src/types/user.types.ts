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

export type IResponseUser = IUserWithData;

export interface IResponseAuth {
  accessToken: string;
  refreshToken: string;
  user: IResponseUser;
}
