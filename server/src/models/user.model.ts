import { User } from '@prisma/client';

import prisma from '@/db/prisma';
import { IUserModel } from '@/types/user.model.interface';
import {
  RegisterUser,
  UserProfile,
  UserWithFollowers,
  UserWithLikedPosts,
} from '@/types/user.types';

class UserModel implements IUserModel {
  public async createUser(data: RegisterUser): Promise<User> {
    return prisma.user.create({ data }); // FIX попробовать найти метод exclude, чтоб убрать при возращении свойство password
  }
  public async getUserByLogin(login: string): Promise<UserWithFollowers | null> {
    return prisma.user.findFirst({
      where: { login },
      include: {
        followers: {
          select: {
            id: true,
            login: true,
            name: true,
            img: true,
          },
        },
      },
    });
  }
  public async getUserById(id: string): Promise<UserWithLikedPosts | null> {
    return prisma.user.findFirst({
      where: { id },
      include: { likedPosts: { select: { id: true } } },
    });
  }
  public async getUserByLoginWithData(login: string): Promise<UserProfile | null> {
    return prisma.user.findUnique({
      where: { login },
      include: {
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
  public async follow(
    followedLogin: string,
    followerLogin: string
  ): Promise<UserWithFollowers | null> {
    return prisma.user.update({
      where: { login: followedLogin },
      data: {
        followers: { connect: { login: followerLogin } },
      },
      include: {
        followers: {
          select: {
            id: true,
            login: true,
            name: true,
            img: true,
          },
        },
      },
    });
  }
  public async unfollow(
    followedLogin: string,
    unfollowLogin: string
  ): Promise<UserWithFollowers | null> {
    const followedUser = await this.getUserByLogin(followedLogin);

    if (followedUser) {
      const newFollowers = followedUser.followers.filter(
        (user) => user.login !== unfollowLogin
      );

      return prisma.user.update({
        where: { login: followedLogin },
        data: {
          followers: { set: newFollowers.map((follow) => ({ id: follow.id })) },
        },
        include: {
          followers: {
            select: {
              id: true,
              login: true,
              name: true,
              img: true,
            },
          },
        },
      });
    } else return null;
  }
}

export default new UserModel();
