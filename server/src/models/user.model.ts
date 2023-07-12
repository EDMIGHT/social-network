import { Post, User } from '@prisma/client';

import prisma from '@/db/prisma';
import { IUserModel } from '@/types/user.model.interface';
import { RegisterUser } from '@/types/user.types';

class UserModel implements IUserModel {
  async createUser(data: RegisterUser): Promise<User> {
    return prisma.user.create({ data }); // FIX попробовать найти метод exclude, чтоб убрать при возращении свойство password
  }
  async getUserByLogin(login: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { login },
    });
  }
  async getUserById(id: string) {
    return prisma.user.findFirst({
      where: { id },
      include: { likedPosts: { select: { id: true } } },
    });
  }
  async getUserByLoginWithData(login: string): Promise<
    | (User & {
        createdPosts: Post[];
      })
    | null
  > {
    return prisma.user.findUnique({
      where: { login },
      include: {
        createdPosts: true,
        likedPosts: true,
        followers: true,
        following: true,
      },
    });
  }
}

export default new UserModel();
