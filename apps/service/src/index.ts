import fastify from "fastify";
import mercurius from "mercurius";
import fcors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { fastifyCookie } from "@fastify/cookie";
import { builder } from "./builder";
import { prisma } from "./prisma";
import { Device, Wallpaper } from "./schema";

import "./schema";
import { lexicographicSortSchema, printSchema } from "graphql";
import { writeFileSync } from "fs";

type UserDeviceCookie = {
  deviceId: string;
  accountId: string;
};

builder.queryType({
  fields: (t) => ({
    deviceWallpaper: t.prismaField({
      type: "Wallpaper",
      args: {
        code: t.arg.string(),
        deviceId: t.arg.string({ required: true }),
      },
      smartSubscription: true,
      // subscribe: (subscriptions, root, args, ctx, info) => {
      //   subscriptions.register("wallpaper-updated");
      // },
      nullable: true,
      resolve: async (query, root, args, { request }, info) => {
        const device = await prisma.device.findUnique({
          select: {
            wallpaper: true,
            following: {
              include: {
                wallpapers: {
                  take: 1,
                },
              },
            },
          },
          where: { deviceId: args.deviceId },
        });
        console.log(device);
        if (device?.wallpaper) {
          return device.wallpaper;
        }

        return device?.following?.wallpapers[0];
      },
    }),
    feed: t.prismaField({
      type: ["Wallpaper"],
      args: {
        skip: t.arg.int({ required: false }),
        take: t.arg.int({ required: false }),
        cursor: t.arg.int({ required: false }),
        // orderBy: t.arg.string({ required: false }),
        // orderBy: t.arg({
        //   type: Prisma.SortOrder,
        // }),
      },
      resolve: async (query, root, args, { request }, info) => {
        return prisma.wallpaper.findMany({
          ...query,
          skip: args.skip ?? undefined,
          take: args.take ?? undefined,
          orderBy: {
            createdAt: args?.orderBy ?? "desc",
          },
          // select: {
          //   _count: {
          //     select: {
          //       collections: true,
          //     },
          //   },
          // },
        });
        // const cookieValue = request.cookies.token;
        // if (cookieValue) {
        //   const jwt = await request.jwtVerify<UserDeviceCookie>();
        //   return prisma.device.findMany({
        //     where: {
        //       accountId: jwt.accountId,
        //     },
        //   });
        // }
      },
    }),
    devices: t.prismaField({
      type: [Device],
      nullable: true,
      resolve: async (query, root, args, { request }, info) => {
        const cookieValue = request.cookies.token;
        if (cookieValue) {
          const jwt = await request.jwtVerify<UserDeviceCookie>();
          return prisma.device.findMany({
            where: {
              accountId: jwt.accountId,
            },
          });
        }
      },
    }),
    // todo: this needs a field that returns 'currentDevice' instead of 'devices'
    me: t.prismaField({
      type: "Account",
      nullable: true,
      resolve: async (query, root, args, { request }, info) => {
        const cookieValue = request.cookies.token;
        console.log(cookieValue);

        if (cookieValue) {
          const jwt = await request.jwtVerify<UserDeviceCookie>();
          return prisma.account.findUnique({
            where: { id: jwt.accountId },
            include: {
              devices: {
                where: {
                  deviceId: jwt.deviceId,
                },
              },
            },
          });
        }
      },
    }),
    currentDevice: t.prismaField({
      type: "Device",
      nullable: true,
      resolve: async (query, root, args, { request }, info) => {
        const cookieValue = request.cookies.token;

        if (cookieValue) {
          const jwt = await request.jwtVerify<UserDeviceCookie>();
          return prisma.device.findUnique({
            where: { deviceId: jwt.deviceId },
          });
        }
      },
    }),
    collection: t.prismaField({
      type: "Collection",
      args: {
        id: t.arg.id({ required: true }),
      },
      nullable: true,
      resolve: async (query, root, { id }, ctx, info) => {
        return prisma.collection.findUnique({
          where: { id: +id },
          include: { wallpapers: true },
        });
      },
    }),
    collectionLatest: t.prismaField({
      type: Wallpaper,
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        const v = await prisma.collection.findUnique({
          where: { id: +args.id },
          select: {
            wallpapers: {
              orderBy: {
                createdAt: "desc",
              },
              take: 1,
            },
          },
        });
        return v?.wallpapers[0];
      },
    }),
    wallpapers: t.prismaField({
      type: [Wallpaper],
      nullable: true,
      resolve: async (query, root, args, ctx, info) => {
        return prisma.wallpaper.findMany();
      },
    }),
    wallpaper: t.prismaField({
      type: "Wallpaper",
      args: {
        id: t.arg.int({ required: true }),
      },
      nullable: true,
      resolve: async (query, root, args, ctx, info) => {
        return prisma.wallpaper.findUnique({
          where: { id: args.id },
          include: { _count: { select: { devices: true, collections: true } } },
        });
      },
    }),
    deviceStatus: t.boolean({
      args: {
        code: t.arg.string({ required: true }),
        deviceId: t.arg.string({ required: true }),
      },
      nullable: true,
      resolve: async (parent, args, ctx) => {
        const device = await prisma.device.findUnique({
          where: { deviceId: args.deviceId },
        });
        if (device?.authorized) {
          return true;
        }
        return false;
      },
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    // Create a nameless device tied to a code
    // This device will get a name & become authenticated on account creation
    registerDevice: t.string({
      args: {
        deviceId: t.arg.string({ required: true }),
      },
      resolve: async (parent, { deviceId }, ctx) => {
        const code = Math.random().toString(36).slice(2, 6).toUpperCase();
        const device = await prisma.device.upsert({
          where: { deviceId },
          update: {
            code,
          },
          create: {
            deviceId,
            code,
          },
        });

        return device.code;
      },
    }),
    createAccount: t.prismaField({
      type: "Account",
      args: {
        deviceId: t.arg.string({ required: true }),
        code: t.arg.string({ required: true }),
        name: t.arg.string({ required: true }),
        email: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx, info) => {
        const { code, deviceId, email, name } = args;
        //todo: make sure code matches to connect device
        const account = await prisma.account.create({
          data: {
            email,
            devices: {
              connect: {
                deviceId,
              },
            },
          },
        });
        const device = await prisma.device.update({
          where: { deviceId },
          data: {
            name,
            authorized: true,
          },
        });
        const token = await ctx.reply.jwtSign({
          deviceId,
          accountId: account.id,
        });

        ctx.reply.setCookie("token", token, {
          // domain: 'localhost:6678',
          // path: '/'
          secure: true,
          httpOnly: true,
          // sameSite: true,
          sameSite: "none",
        });
        return account;
      },
    }),
    // todo: this only allows the user to follow a collection for their current device
    // pro feature is to let the user follow a collection for another device?
    // how would security work for that? is assuming the user having the deviceId good enough?

    // remove the selected wallpaper in favour of the collection
    followCollection: t.prismaField({
      type: "Device",
      args: {
        id: t.arg.int({ required: true }),
      },
      nullable: true,
      resolve: async (query, root, args, { request }, info) => {
        const cookieValue = request.cookies.token;
        if (cookieValue) {
          const jwt = await request.jwtVerify<UserDeviceCookie>();
          return prisma.device.update({
            where: {
              deviceId: jwt.deviceId,
            },
            data: {
              wallpaper: {
                disconnect: true,
              },
              following: {
                connect: {
                  id: args.id,
                },
              },
            },
          });
        }
      },
    }),
    // We can keep the current collection in case the user wants to remove the selected wallpaper but not one in particular
    selectWallpaper: t.prismaField({
      type: "Device",
      args: {
        id: t.arg.int({ required: true }),
      },
      nullable: true,
      resolve: async (query, root, args, { request }, info) => {
        const cookieValue = request.cookies.token;
        if (cookieValue) {
          const jwt = await request.jwtVerify<UserDeviceCookie>();
          return prisma.device.update({
            where: {
              deviceId: jwt.deviceId,
            },
            data: {
              wallpaper: {
                connect: {
                  id: args.id,
                },
              },
            },
          });
        }
      },
    }),
    authenticate: t.prismaField({
      type: "Account",
      args: {
        deviceId: t.arg.string({ required: true }),
        code: t.arg.string({ required: true }),
        email: t.arg.string({ required: true }),
      },
      nullable: true,
      resolve: async (query, root, args, ctx, info) => {
        const account = await prisma.account.findUnique({
          where: {
            email: args.email,
          },
          select: {
            id: true,
            email: true,
            devices: {
              where: {
                AND: [
                  {
                    code: {
                      equals: args.code,
                    },
                  },
                  {
                    deviceId: {
                      equals: args.deviceId,
                    },
                  },
                ],
              },
            },
          },
        });

        if (account?.devices.length) {
          const token = await ctx.reply.jwtSign({
            deviceId: account.devices[0].id,
            accountId: account.id,
          });

          ctx.reply.setCookie("token", token, {
            // domain: 'localhost:6678',
            // path: '/'
            secure: true,
            httpOnly: true,
            // sameSite: true,
            sameSite: "none",
          });

          return account;
        }
      },
    }),
  }),
});

const schema = builder.toSchema();

const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync("./schema.graphql", schemaAsString);

const app = fastify();

app.register(fastifyCookie, {
  secret: "123098",
  // hook: "onRequest",
});

app.register(fastifyJwt, {
  secret: "123098",
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

app.register(fcors, {
  credentials: true,
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
});

app.register(mercurius, {
  schema,
  graphiql: true,
  context(request, reply) {
    return { request, reply };
  },
});

// app.addHook("onRequest", (request) => request.jwtVerify());

app.listen({ port: 6678 });
