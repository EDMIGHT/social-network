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
}

class PostModel {
  public async createPost(data: CreatePost): Promise<Post> {
    return prisma.post.create({
      data: {
        ...data,
        tags: {
          connect: data.tags.map((tagId) => ({ id: tagId })),
        },
      },
    });
  }

  public async getPosts({ page, limit, sort, order, tags }: GetPostArg): Promise<Post[]> {
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

    return await prisma.post.findMany({
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
  public async getTotal(): Promise<number> {
    return await prisma.post.count();
  }
}

export default new PostModel();
