import prisma from '@/db/prisma';

interface GetAllCommentsArg {
  page: number;
  limit: number;
  sort: string;
  order: 'asc' | 'desc';
}

class CommentModel {
  public getAll({ page, limit, sort, order }: GetAllCommentsArg) {
    const offset = (+page - 1) * +limit;

    return prisma.comment.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        [sort]: order,
      },
      include: {
        user: { select: { login: true, name: true, img: true } },
      },
    });
  }
}

export default new CommentModel();
