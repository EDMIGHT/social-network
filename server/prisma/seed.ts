import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const TAG_PER_SEEDING = 30;
const POSTS_PER_SEEDING = 30;
const USERS_PER_SEEDING = 10;
const MAX_TAGS_PER_POST_SEEDING = 5;
const MAX_LIKES_PER_POST_SEEDING = 10;

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  await prisma.tag.createMany({
    data: Array(TAG_PER_SEEDING)
      .fill(null)
      .map(() => ({ name: faker.music.genre().toLowerCase() })),
    skipDuplicates: true,
  });

  const users = await prisma.user.createMany({
    data: Array(USERS_PER_SEEDING)
      .fill(null)
      .map(() => ({
        login: faker.internet.userName(),
        img: faker.image.avatar(),
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      })),
  });

  const allTags = await prisma.tag.findMany();
  const allUsers = await prisma.user.findMany();

  const allPosts = await prisma.$transaction(
    Array(POSTS_PER_SEEDING)
      .fill(null)
      .map(() => {
        // Selecting a random number of tags
        const randomTags = faker.helpers.arrayElements(
          allTags,
          faker.number.int({ min: 1, max: MAX_TAGS_PER_POST_SEEDING })
        );
        const randomUsers = faker.helpers.arrayElements(
          allUsers,
          faker.number.int({ min: 1, max: MAX_LIKES_PER_POST_SEEDING })
        );

        return prisma.post.create({
          data: {
            text: faker.lorem.paragraph(),
            img: faker.image.url(),
            userId: allUsers[Math.floor(Math.random() * users.count)].id, // Random user
            tags: {
              connect: randomTags.map((tag) => ({ id: tag.id })),
            },
            likedBy: {
              connect: randomUsers.map((user) => ({ id: user.id })),
            },
          },
        });
      })
  );

  await prisma.comment.createMany({
    data: Array(30)
      .fill(null)
      .map(() => ({
        text: faker.lorem.sentence({ min: 2, max: 50 }),
        postId: allPosts[Math.floor(Math.random() * allPosts.length)].id, // Random post
        userId: allUsers[Math.floor(Math.random() * allUsers.length)].id, // Random user
      })),
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
