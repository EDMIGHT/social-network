import { User } from '@prisma/client';

import prisma from '@/db/prisma';
import { IPagination } from '@/types/response.types';
import { IUserModel } from '@/types/user.model.interface';
import {
  RegisterUser,
  ResponseUser,
  UserProfile,
  UserWithData,
  UserWithFollow,
  UserWithFollowing,
} from '@/types/user.types';
import createResponseUser from '@/utils/helpers/createResponseUser';

interface IGetFollow extends IPagination {
  login: string;
}
interface ISearchUsersArg extends IPagination {
  login: string;
}
interface IUpdateUserArg {
  id: string;
  data: Partial<Pick<User, 'img' | 'name' | 'email'>>;
}

class UserModel implements IUserModel {
  public async createUser(data: RegisterUser): Promise<User> {
    return prisma.user.create({
      data,
      include: {
        following: {
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
  public async searchUsersByLogin({
    login,
    limit,
    page,
  }: ISearchUsersArg): Promise<(ResponseUser | null)[]> {
    const offset = (page - 1) * limit;

    const existedUser = await prisma.user.findMany({
      skip: offset,
      take: limit,
      where: {
        login: {
          contains: login,
        },
      },
    });

    return existedUser.map((user) => createResponseUser(user));
  }
  public async getTotalSearchedUsers(login: string): Promise<number> {
    return prisma.user.count({
      where: {
        login: {
          contains: login,
        },
      },
    });
  }
  public async getUserByLogin(login: string): Promise<UserWithFollowing | null> {
    return prisma.user.findFirst({
      where: { login },
      include: {
        following: {
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
  public async getUserById(id: string): Promise<UserWithFollow | null> {
    return prisma.user.findFirst({
      where: { id },
      include: {
        likedPosts: { select: { id: true } },
        followers: { select: { login: true } },
        following: { select: { login: true } },
      },
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
  ): Promise<UserWithData | null> {
    return prisma.user.update({
      where: { login: followedLogin },
      data: {
        following: { connect: { login: followerLogin } },
      },
      include: {
        likedPosts: { select: { id: true } },
        followers: { select: { login: true } },
        following: { select: { login: true } },
      },
    });
  }
  public async unfollow(
    followedLogin: string,
    unfollowLogin: string
  ): Promise<UserWithData | null> {
    const followedUser = await this.getUserByLogin(followedLogin);

    if (followedUser) {
      const newFollowers = followedUser.following.filter(
        (user) => user.login !== unfollowLogin
      );

      return prisma.user.update({
        where: { login: followedLogin },
        data: {
          following: { set: newFollowers.map((follow) => ({ login: follow.login })) },
        },
        include: {
          likedPosts: { select: { id: true } },
          followers: { select: { login: true } },
          following: { select: { login: true } },
        },
      });
    } else return null;
  }
  public async getFollowers({ login, page, limit }: IGetFollow): Promise<ResponseUser[]> {
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

    return user?.followers.map((follow) => createResponseUser(follow) as User) ?? [];
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
  public async getFollowing({ login, page, limit }: IGetFollow): Promise<ResponseUser[]> {
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

    return user?.following.map((follow) => createResponseUser(follow) as User) ?? [];
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
  public async updateUserById({ id, data }: IUpdateUserArg): Promise<UserWithFollow> {
    return prisma.user.update({
      where: { id },
      data: { ...data },
      include: {
        likedPosts: { select: { id: true } },
        followers: { select: { login: true } },
        following: { select: { login: true } },
      },
    });
  }
}

export default new UserModel();
