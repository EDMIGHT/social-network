import { User } from '@prisma/client';

export type RegisterUser = Pick<User, 'img' | 'email' | 'name' | 'login' | 'password'>;
export type LoginUser = Pick<User, 'login' | 'password'>;
export type ResponseUser = Pick<User, 'login' | 'email' | 'img' | 'name' | 'createdAt'>;
export type IncludedUser = Pick<User, 'id' | 'name' | 'login' | 'img'>;

// type guards
export const isRegisterUser = (obj: unknown): obj is RegisterUser => {
  return obj !== null && typeof obj === 'object' && 'password' in obj && 'img' in obj;
};

export const isLoginUser = (obj: unknown): obj is LoginUser => {
  return obj !== null && typeof obj === 'object' && 'password' in obj && 'login' in obj;
};
