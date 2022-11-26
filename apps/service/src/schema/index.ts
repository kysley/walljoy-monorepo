import { Prisma } from "@prisma/client";
import { DateResolver } from "graphql-scalars";
import { builder } from "../builder";
import { prisma } from "../prisma";

export const Account = builder.prismaObject("Account", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    devices: t.relation("devices"),
  }),
});

export const Device = builder.prismaObject("Device", {
  fields: (t) => ({
    id: t.exposeID("id"),
    deviceId: t.exposeString("deviceId"),
    authorized: t.exposeBoolean("authorized"),
    following: t.relation("following", { nullable: true }),
    wallpaper: t.relation("wallpaper", { nullable: true }),
    name: t.exposeString("name", { nullable: true }),
  }),
});

export const Wallpaper = builder.prismaObject("Wallpaper", {
  fields: (t) => ({
    id: t.exposeID("id"),
    collections: t.relation("collections"),
    collectionCount: t.relationCount("collections"),
    unsplashUrl: t.exposeString("u_url", { nullable: true }),
    devicesCount: t.relationCount("devices"),
    createdAt: t.field({ type: "Date", resolve: (parent) => parent.createdAt }),
  }),
});

export const CollectionWallpaper = builder.prismaObject("CollectionWallpaper", {
  fields: (t) => ({
    id: t.exposeID("id"),
    collection: t.relation("collection"),
    wallpaper: t.relation("wallpaper"),
    addedAt: t.field({
      type: "Date",
      resolve: (parent, args, context, info) => {
        return parent.createdAt;
      },
    }),
  }),
});

export const Collection = builder.prismaObject("Collection", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    wallpapers: t.relation("wallpapers"),
    followers: t.relationCount("devices"),
  }),
});

builder.addScalarType("Date", DateResolver, {});
builder.subscriptionType({});
builder.subscriptionField("name", (t) =>
  t.field({ type: "String", resolve: () => new Promise(() => "hey") })
);
