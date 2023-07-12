import { User } from '@prisma/client';

import prisma from '@/db/prisma';
import { IUserModel } from '@/types/user.model.interface';
import { RegisterUser, UserProfile, UserWithLikedPosts } from '@/types/user.types';

class UserModel implements IUserModel {
  async createUser(data: RegisterUser): Promise<User> {
    return prisma.user.create({ data }); // FIX попробовать найти метод exclude, чтоб убрать при возращении свойство password
  }
  async getUserByLogin(login: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { login },
    });
  }
  async getUserById(id: string): Promise<UserWithLikedPosts | null> {
    return prisma.user.findFirst({
      where: { id },
      include: { likedPosts: { select: { id: true } } },
    });
  }
  async getUserByLoginWithData(login: string): Promise<UserProfile | null> {
    return prisma.user.findUnique({
      where: { login },
      include: {
        createdPosts: {
          include: {
            likedBy: true,
            comments: true,
            tags: true,
            user: true,
          },
        },
        _count: {
          select: {
            createdPosts: true,
            likedPosts: true,
            followers: true,
            following: true,
          },
        },
      },
    });
  }
}

export default new UserModel();
