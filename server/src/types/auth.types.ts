import { User } from '@prisma/client';

export type RegisterUser = Pick<User, 'email' | 'name' | 'login' | 'password'> & {
  img?: User['img'];
};
export type LoginUser = Pick<User, 'login' | 'password'>;

// type guards
export const isRegisterUser = (obj: unknown): obj is RegisterUser => {
  return obj !== null && typeof obj === 'object' && 'password' in obj && 'img' in obj;
};

export const isLoginUser = (obj: unknown): obj is LoginUser => {
  return obj !== null && typeof obj === 'object' && 'password' in obj && 'login' in obj;
};
