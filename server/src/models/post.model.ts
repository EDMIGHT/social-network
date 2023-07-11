import { Post } from '@prisma/client';

import prisma from '@/db/prisma';
import { CreatePost, GetPostArg, PostWithUser } from '@/types/post.types';

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
  public async create(data: CreatePost) {
    console.log(data);
    return prisma.post.create({
      data: {
        ...data,
        tags: {
          connect: data.tags.map((tagName) => ({ name: tagName.trim() })),
        },
      },
      include: {
        tags: true,
        user: {
          select: {
            login: true,
            name: true,
            img: true,
          },
        },
        likedBy: { select: { id: true, img: true, name: true, login: true } },
      },
    });
  }

  public async get({ login, page, limit, sort, order, tags }: GetPostArg) {
    const query: Query = {};

    const offset = (+page - 1) * +limit;

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
        tags: true,
        comments: true,
        user: {
          select: {
            login: true,
            name: true,
            img: true,
          },
        },
        likedBy: { select: { id: true, img: true, name: true, login: true } },
      },
    });
  }
  public async getById(id: string): Promise<PostWithUser | null> {
    return await prisma.post.findFirst({
      where: { id },
      include: {
        tags: true,
        comments: true,
        user: {
          select: {
            login: true,
            name: true,
            img: true,
          },
        },
        likedBy: { select: { id: true, img: true, name: true, login: true } },
      },
    });
  }

  public async deleteById(id: string): Promise<Post> {
    const existedComments = await prisma.comment.count({
      where: {
        postId: id,
      },
    });

    if (existedComments) {
      await prisma.comment.deleteMany({
        where: {
          postId: id,
        },
      });
    }

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
  ): Promise<PostWithUser | null> {
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
      include: { likedBy: { select: { id: true, img: true, name: true, login: true } } },
    });
  }

  public async pushToLikedBy(postId: string, userId: string): Promise<PostWithUser> {
    return prisma.post.update({
      where: { id: postId },
      data: { likedBy: { connect: { id: userId } } },
      include: { likedBy: { select: { id: true, img: true, name: true, login: true } } },
    });
  }
  public async removeFromLikedBy(
    postId: string,
    userId: string
  ): Promise<PostWithUser | null> {
    const post = await this.getById(postId);

    if (post) {
      const newLikedBy = post.likedBy.filter((user) => user.id !== userId);

      return prisma.post.update({
        where: { id: postId },
        data: { likedBy: { set: newLikedBy.map((user) => ({ id: user.id })) } },
        include: { likedBy: { select: { id: true, img: true, name: true, login: true } } },
      });
    } else return null;
  }
}

export default new PostModel();
