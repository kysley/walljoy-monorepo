import fastify from "fastify";
import mercurius from "mercurius";
import fcors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { fastifyCookie } from "@fastify/cookie";
import { builder } from "./builder";
import { prisma } from "./prisma";
import { Wallpaper } from "./schema";

import "./schema";

builder.queryType({
	fields: (t) => ({
		hello: t.string({
			args: {
				name: t.arg.string(),
			},
			resolve: (parent, { name }) => `hello, ${name || "World"}`,
			nullable: true,
		}),
		me: t.string({
			resolve: async (parent, { name }, { request, reply }) => {
				const cookieValue = request.cookies.token;
				console.log(cookieValue);
				if (cookieValue) {
					const valid = await request.jwtVerify(cookieValue);
					console.log(valid.deviceID);
					return valid.deviceID;
				}

				// return cookieValue || "no cookie";
			},
		}),
		wallpapers: t.prismaField({
			type: ["Wallpaper"],
			nullable: true,
			resolve: async (query, root, args, ctx, info) => {
				const a = await prisma.wallpaper.findMany();
				console.log(a);
				return a;
			},
		}),
	}),
});

builder.mutationType({
	fields: (t) => ({
		authenticate: t.string({
			args: {
				deviceID: t.arg.string(),
			},
			resolve: async (parent, { deviceID }, ctx) => {
				// ctx.request.cook
				const token = await ctx.reply.jwtSign({
					deviceID,
				});

				ctx.reply.setCookie("token", token, {
					// domain: 'localhost:6678',
					// path: '/'
					secure: true,
					httpOnly: true,
					// sameSite: true,
					sameSite: "none",
				});
				// .code(200);
				// .send("cookie sent");

				return "cookie sent";
			},
		}),
	}),
});

const schema = builder.toSchema();

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
	origin: ["http://127.0.0.1:5173"],
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
