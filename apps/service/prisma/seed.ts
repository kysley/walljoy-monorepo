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

  await prisma.wallpaper.createMany({
    data: [
      {
        u_url: await waitToGetUnsplashUrl("earth"),
      },
      {
        u_url: await waitToGetUnsplashUrl("earth"),
      },
      {
        u_url: await waitToGetUnsplashUrl("earth"),
      },
      {
        u_url: await waitToGetUnsplashUrl("structure"),
      },
      {
        u_url: await waitToGetUnsplashUrl("structure"),
      },
      {
        u_url: await waitToGetUnsplashUrl("structure"),
      },
      {
        u_url: await waitToGetUnsplashUrl("random"),
      },
      {
        u_url: await waitToGetUnsplashUrl("random"),
      },
      {
        u_url: await waitToGetUnsplashUrl("random"),
      },
    ],
  });

  await prisma.collectionWallpaper.createMany({
    data: [
      {
        collectionId: 1,
        wallpaperId: 1,
      },
      {
        collectionId: 1,
        wallpaperId: 2,
      },
      {
        collectionId: 1,
        wallpaperId: 3,
      },
      {
        collectionId: 2,
        wallpaperId: 4,
      },
      {
        collectionId: 2,
        wallpaperId: 5,
      },
      {
        collectionId: 2,
        wallpaperId: 6,
      },
      {
        collectionId: 3,
        wallpaperId: 7,
      },
      {
        collectionId: 3,
        wallpaperId: 8,
      },
      {
        collectionId: 3,
        wallpaperId: 9,
      },
    ],
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
