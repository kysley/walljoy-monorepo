import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

async function main() {
  try {
    await prisma.account.create({
      data: {
        email: "",
        id: "admin",
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
      },
      {
        name: "Random",
        official: true,
        ownerId: "admin",
      },
      {
        name: "Structure",
        official: true,
        ownerId: "admin",
      },
    ],
  });

  // Earth collection
  await prisma.collection.update({
    where: {
      id: 4,
    },
    data: {
      wallpapers: {
        create: [
          {
            u_url: "earth-1",
          },
          {
            u_url: "earth-2",
          },
          {
            u_url: "earth-3",
          },
        ],
      },
    },
  });

  // Random collection
  await prisma.collection.update({
    where: {
      id: 5,
    },
    data: {
      wallpapers: {
        create: [
          {
            u_url: "random-1",
          },
          {
            u_url: "random-2",
          },
          {
            u_url: "random-3",
          },
        ],
      },
    },
  });

  // Structure collection
  await prisma.collection.update({
    where: {
      id: 6,
    },
    data: {
      wallpapers: {
        create: [
          {
            u_url: "structure-1",
          },
          {
            u_url: "structure-2",
          },
          {
            u_url: "structure-3",
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
