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
  user?: {
    login: string;
  };
}

interface QueryUpdate {
  tags?: {
    connect: {
      id: string;
    }[];
  };
}

type UpdatePostData = Partial<Post> & {
  tags?: string[];
};

class PostModel {
  public async create(data: CreatePost): Promise<Post> {
    console.log(data);
    return prisma.post.create({
      data: {
        ...data,
        tags: {
          connect: data.tags.map((tagName) => ({ name: tagName.trim() })),
        },
      },
      include: {
        tags: true, // убрать, если не нужно отображение тэгов
        user: {
          select: {
            login: true,
            name: true,
            img: true,
          },
        },
      },
    });
  }

  public async get({
    login,
    offset,
    limit,
    sort,
    order,
    tags,
  }: GetPostArg): Promise<Post[] | null> {
    const query: Query = {};

    if (tags.length > 0) {
      query.tags = {
        some: {
          name: {
            in: tags,
          },
        },
      };
    }
    if (login) {
      query.user = {
        login,
      };
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
        user: {
          select: {
            login: true,
            name: true,
            img: true,
          },
        },
      },
    });
  }
  public async getById(id: string): Promise<Post | null> {
    return await prisma.post.findFirst({
      where: { id },
    });
  }

  public async deleteById(id: string): Promise<Post> {
    return prisma.post.delete({
      where: { id },
    });
  }

  public async getTotal(): Promise<number> {
    return prisma.post.count();
  }

  public async updateById(
    id: string,
    { tags, ...data }: UpdatePostData
  ): Promise<Post | null> {
    const query: QueryUpdate = {};

    if (tags) {
      query.tags = {
        connect: tags.map((tagId) => ({ id: tagId.trim() })),
      };
    }

    return prisma.post.update({
      where: { id },
      data: {
        ...data,
        ...query,
      },
    });
  }
}

export default new PostModel();
