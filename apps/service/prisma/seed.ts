import { PrismaClient } from "@prisma/client";
import { waitToGetUnsplashUrl } from "../src/unsplash";

const prisma = new PrismaClient({});

async function main() {
  const v = await waitToGetUnsplashUrl();
  console.log(v);

  try {
    await prisma.account.create({
      data: {
        email: "",
        id: "admin",
        devices: {
          connectOrCreate: {
            create: {
              code: "ABCD",
              name: "Test device",
              deviceId: "001",
            },
            where: {
              id: "admin",
            },
          },
        },
      },
    });
  } catch (e) {
    console.log("admin user already exists");
  }

  await prisma.collection.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Earth",
        official: true,
        ownerId: "admin",
        id: 1,
      },
      {
        name: "Random",
        official: true,
        ownerId: "admin",
        id: 2,
      },
      {
        name: "Structure",
        official: true,
        ownerId: "admin",
        id: 3,
      },
    ],
  });

  // Earth collection
  await prisma.collection.update({
    where: {
      id: 1,
    },
    data: {
      wallpapers: {
        create: [
          {
            u_url: await waitToGetUnsplashUrl(),
          },
          {
            u_url: await waitToGetUnsplashUrl(),
          },
          {
            u_url: await waitToGetUnsplashUrl(),
          },
        ],
      },
    },
  });

  // Random collection
  await prisma.collection.update({
    where: {
      id: 2,
    },
    data: {
      wallpapers: {
        create: [
          {
            u_url: await waitToGetUnsplashUrl(),
          },
          {
            u_url: await waitToGetUnsplashUrl(),
          },
          {
            u_url: await waitToGetUnsplashUrl(),
          },
        ],
      },
    },
  });

  // Structure collection
  await prisma.collection.update({
    where: {
      id: 3,
    },
    data: {
      wallpapers: {
        create: [
          {
            u_url: await waitToGetUnsplashUrl(),
          },
          {
            u_url: await waitToGetUnsplashUrl(),
          },
          {
            u_url: await waitToGetUnsplashUrl(),
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
