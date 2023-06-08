import { Post } from '@prisma/client';

import prisma from '@/db/prisma';
import { CreatePost, GetPostArg } from '@/types/post.types';

interface Query {
  tags?: {
    some: {
      name: {
        in: string[];
      };
    };
  };
  userId?: string;
}

interface QueryUpdate {
  tags?: {
    connect: {
      id: string;
    }[];
  };
}

class PostModel {
  public async createPost(data: CreatePost): Promise<Post | null> {
    try {
      // TODO проверку на существование тэгов
      if (data.userId && data.title && data.text) {
        return prisma.post.create({
          data: {
            ...data,
            tags: {
              connect: data.tags.map((tagId) => ({ id: tagId.trim() })),
            },
          },
        });
      } else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getPosts({
    userId,
    page,
    limit,
    sort,
    order,
    tags,
  }: GetPostArg): Promise<Post[]> {
    const offset = (page - 1) * limit;

    const query: Query = {};

    if (tags) {
      const tagList = tags ? (tags as string).split(',') : [];
      query.tags = {
        some: {
          name: {
            in: tagList,
          },
        },
      };
    }
    if (userId) {
      query.userId = userId;
    }

    return prisma.post.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        [sort as string]: order,
      },
      where: {
        ...query,
      },
      include: {
        tags: true, // убрать, если не нужно отображение тэгов
      },
    });
  }

  public async deleteById(id: string): Promise<Post | null> {
    const post = await prisma.post.findFirst({
      where: { id },
    });

    if (post) {
      return prisma.post.delete({
        where: { id },
      });
    } else {
      return null;
    }
  }

  public async getTotal(): Promise<number> {
    return prisma.post.count();
  }

  public async updateById(id: string, data: any): Promise<Post | null> {
    const query: QueryUpdate = {};

    if (data.tags) {
      const tagList = (data.tags as string).split(',');
      query.tags = {
        connect: tagList.map((tagId) => ({ id: tagId.trim() })),
      };
    }

    const existedPost = await prisma.post.findFirst({
      where: { id },
    });

    if (existedPost) {
      return prisma.post.update({
        where: { id },
        data: {
          ...data,
          ...query,
        },
      });
    } else return null;
  }
}

export default new PostModel();
