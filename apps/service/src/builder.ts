import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaTypes from "@pothos/plugin-prisma/generated";
import SmartSubscriptionsPlugin, {
  subscribeOptionsFromIterator,
} from "@pothos/plugin-smart-subscriptions";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "./prisma";
import { pubsub } from "./pubsub";

export const builder = new SchemaBuilder<{
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
  PrismaTypes: PrismaTypes;
  Context: { request: FastifyRequest; reply: FastifyReply };
}>({
  plugins: [PrismaPlugin, SmartSubscriptionsPlugin],
  prisma: {
    client: prisma,
  },
  smartSubscriptions: {
    ...subscribeOptionsFromIterator((name, { request }) => {
      return pubsub.asyncIterator(name);
    }),
  },
});
