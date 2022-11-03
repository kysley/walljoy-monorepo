import { builder } from "../builder";
import { prisma } from "../prisma";

export const Account = builder.prismaObject("Account", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    devices: t.relation("devices"),
  }),
});

// Not sure if this is the best way to go about doing this
// export const PartialDevice = builder.prismaObject("Device", {
//   fields: (t) => ({
//     id: t.exposeID("id"),
//     deviceId: t.exposeString("deviceId"),
//     name: t.exposeString("name", { nullable: true }),
//     code: t.exposeString("code"),
//   }),
// });

export const Device = builder.prismaObject("Device", {
  fields: (t) => ({
    id: t.exposeID("id"),
    deviceId: t.exposeString("deviceId"),
    authorized: t.exposeBoolean("authorized"),
    // activeCollectionId: t.exposeInt("activeCollectionId", {
    //   nullable: true,
    // }),
    followedCollection: t.relation("followedCollection", { nullable: true }),
    selectWallpaper: t.relation("selectWallpaper", { nullable: true }),
    name: t.exposeString("name", { nullable: true }),
    // history: t.relation("history"),
  }),
});

export const Wallpaper = builder.prismaObject("Wallpaper", {
  fields: (t) => ({
    id: t.exposeID("id"),
    unsplashUrl: t.exposeString("u_url", { nullable: true }),
    devices: t.relationCount("devices"),
    createdAt: t.field({
      type: "String",
      resolve(parent, args, context, info) {
        return parent.createdAt as string;
      },
    }),
  }),
});

export const Collection = builder.prismaObject("Collection", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    wallpapers: t.relation("wallpapers"),
    followers: t.relationCount("device"),
  }),
});
