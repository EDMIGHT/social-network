import { User } from '@prisma/client';

import prisma from '@/db/prisma';
import { IUserModel } from '@/types/user.model.interface';
import {
  RegisterUser,
  UserProfile,
  UserWithFollowers,
  UserWithLikedPosts,
} from '@/types/user.types';

interface GetFollow {
  login: string;
  page: number;
  limit: number;
}

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
  public async getFollowers({ login, page, limit }: GetFollow): Promise<User[]> {
    const offset = (page - 1) * limit;

    const user = await prisma.user.findFirst({
      where: { login },
      select: {
        followers: {
          take: limit,
          skip: offset,
        },
      },
    });

    return user?.followers ?? [];
  }
  public async getTotalFollowers(login: string): Promise<number> {
    const user = await prisma.user.findFirst({
      where: { login },
      include: {
        followers: true,
      },
    });

    return user?.followers.length ?? 0;
  }
  public async getFollowing({ login, page, limit }: GetFollow): Promise<User[]> {
    const offset = (page - 1) * limit;

    const user = await prisma.user.findFirst({
      where: { login },
      select: {
        following: {
          take: limit,
          skip: offset,
        },
      },
    });

    return user?.following ?? [];
  }
  public async getTotalFollowing(login: string): Promise<number> {
    const user = await prisma.user.findFirst({
      where: { login },
      include: {
        following: true,
      },
    });

    return user?.following.length ?? 0;
  }
}

export default new UserModel();
