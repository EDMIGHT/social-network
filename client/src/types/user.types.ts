export interface User {
  id: string;
  login: string;
  img: string;
  name: string | null;
  email: string | null;
  password: string;
  createdAt: Date;
}

export type ResponseUser = Pick<User, 'login' | 'img' | 'name' | 'email' | 'createdAt'>;

export interface ResponseAuth {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: ResponseUser;
}
