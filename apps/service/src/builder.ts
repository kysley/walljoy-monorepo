import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaTypes from "@pothos/plugin-prisma/generated";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "./prisma";

export const builder = new SchemaBuilder<{
	PrismaTypes: PrismaTypes;
	Context: { request: FastifyRequest; reply: FastifyReply };
}>({
	plugins: [PrismaPlugin],
	prisma: {
		client: prisma,
	},
});
