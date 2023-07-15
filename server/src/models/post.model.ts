import { Post, Tag } from '@prisma/client';

import prisma from '@/db/prisma';
import { CreatePost, GetPostArg, GetTotalPostArg, PostWithData } from '@/types/post.types';
import { IPagination } from '@/types/response.types';

interface IQuery {
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

interface IGetLikedPots extends IPagination {
  login: string;
  sort: string;
  order: string;
  tags: string[];
}

interface IQueryUpdate {
  tags?: {
    connect: {
      id: string;
    }[];
    disconnect: {
      id: string;
    }[];
  };
}

type IUpdatePostData = Partial<Post> & {
  tags?: Tag[];
};

class PostModel {
  public async create(data: CreatePost): Promise<PostWithData | null> {
    return prisma.post.create({
      data: {
        ...data,
        tags: {
          connect: data.tags.map((tagName) => ({ name: tagName.trim() })),
        },
      },
      include: {
        comments: true,
        tags: true,
        user: {
          select: {
            id: true,
            login: true,
            name: true,
            img: true,
          },
        },
        likedBy: { select: { id: true, img: true, name: true, login: true } },
      },
    });
  }

  public async get({
    login,
    page,
    limit,
    sort,
    order,
    tags,
  }: GetPostArg): Promise<PostWithData[]> {
    const query: IQuery = {};

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
            id: true,
            login: true,
            name: true,
            img: true,
          },
        },
        likedBy: { select: { id: true, img: true, name: true, login: true } },
      },
    });
  }
  public async getById(id: string): Promise<PostWithData | null> {
    return await prisma.post.findFirst({
      where: { id },
      include: {
        tags: true,
        comments: true,
        user: {
          select: {
            id: true,
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

  public async getTotal({ tags, login }: GetTotalPostArg): Promise<number> {
    const query: IQuery = {};

    if (tags && tags.length > 0) {
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

    return prisma.post.count({
      where: {
        ...query,
      },
    });
  }

  public async updateById(
    id: string,
    { tags, ...data }: IUpdatePostData
  ): Promise<PostWithData | null> {
    const existedPosts = (await this.getById(id)) as PostWithData;

    const query: IQueryUpdate = {};

    if (tags) {
      query.tags = {
        disconnect: existedPosts.tags.map((tag) => ({ id: tag.id })),
        connect: tags.map((tag) => ({ id: tag.id })),
      };
    }

    return prisma.post.update({
      where: { id },
      data: {
        ...data,
        ...query,
        updatedAt: new Date(),
      },
      include: {
        tags: true,
        comments: true,
        user: {
          select: {
            id: true,
            login: true,
            name: true,
            img: true,
          },
        },
        likedBy: { select: { id: true, img: true, name: true, login: true } },
      },
    });
  }

  public async pushToLikedBy(postId: string, userId: string): Promise<PostWithData> {
    return prisma.post.update({
      where: { id: postId },
      data: { likedBy: { connect: { id: userId } } },
      include: {
        tags: true,
        comments: true,
        user: {
          select: {
            id: true,
            login: true,
            name: true,
            img: true,
          },
        },
        likedBy: { select: { id: true, img: true, name: true, login: true } },
      },
    });
  }
  public async removeFromLikedBy(
    postId: string,
    userId: string
  ): Promise<PostWithData | null> {
    const post = await this.getById(postId);

    if (post) {
      const newLikedBy = post.likedBy.filter((user) => user.id !== userId);

      return prisma.post.update({
        where: { id: postId },
        data: { likedBy: { set: newLikedBy.map((user) => ({ id: user.id })) } },
        include: {
          tags: true,
          comments: true,
          user: {
            select: {
              id: true,
              login: true,
              name: true,
              img: true,
            },
          },
          likedBy: { select: { id: true, img: true, name: true, login: true } },
        },
      });
    } else return null;
  }

  public getLikedPosts({
    login,
    page,
    limit,
    sort,
    order,
    tags,
  }: IGetLikedPots): Promise<PostWithData[]> {
    const offset = (page - 1) * limit;
    const query: IQuery = {};

    if (tags.length > 0) {
      query.tags = {
        some: {
          name: {
            in: tags,
          },
        },
      };
    }

    return prisma.post.findMany({
      where: {
        likedBy: {
          some: {
            login,
          },
        },
        ...query,
      },
      take: limit,
      skip: offset,
      orderBy: {
        [sort]: order,
      },
      include: {
        tags: true,
        comments: true,
        user: {
          select: {
            id: true,
            login: true,
            name: true,
            img: true,
          },
        },
        likedBy: { select: { id: true, img: true, name: true, login: true } },
      },
    });
  }
  public getTotalLikedPostByUser({
    login,
    tags,
  }: Pick<IGetLikedPots, 'login' | 'tags'>): Promise<number> {
    const query: IQuery = {};

    if (tags.length > 0) {
      query.tags = {
        some: {
          name: {
            in: tags,
          },
        },
      };
    }

    return prisma.post.count({
      where: {
        likedBy: {
          some: {
            login,
          },
        },
        ...query,
      },
    });
  }
}

export default new PostModel();
