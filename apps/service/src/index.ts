import fastify from "fastify";
import mercurius from "mercurius";
import fcors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { fastifyCookie } from "@fastify/cookie";
import { builder } from "./builder";
import { prisma } from "./prisma";
import { Wallpaper } from "./schema";

import "./schema";
import { lexicographicSortSchema, printSchema } from "graphql";
import { writeFileSync } from "fs";

type UserDeviceCookie = {
	deviceId: string;
	accountId: string;
};

builder.queryType({
	fields: (t) => ({
		hello: t.string({
			args: {
				name: t.arg.string(),
			},
			resolve: (parent, { name }) => `hello, ${name || "World"}`,
			nullable: true,
		}),
		me: t.prismaField({
			type: "Account",
			nullable: true,
			resolve: async (query, root, args, { request }, info) => {
				const cookieValue = request.cookies.token;
				console.log(cookieValue);

				if (cookieValue) {
					const jwt = await request.jwtVerify<UserDeviceCookie>();
					return prisma.account.findUnique({ where: { id: jwt.accountId } });
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
	}),
});

builder.mutationType({
	fields: (t) => ({
		register: t.prismaField({
			type: "Account",
			args: {
				deviceId: t.arg.string({ required: true }),
				deviceName: t.arg.string({ required: true }),
				email: t.arg.string({ required: true }),
				// code: t.arg.string({ required: true }),
			},
			resolve: async (query, root, args, ctx, info) => {
				const account = await prisma.account.create({
					data: {
						email: args.email,
						devices: {
							create: {
								deviceId: args.deviceId,
								authorized: true,
								code: "NO_CODE",
								name: args.deviceName,
							},
						},
					},
				});
				const token = await ctx.reply.jwtSign({
					deviceId: args.deviceId,
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
					update: {},
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
		// 	authenticate: t.string({
		// 		args: {
		// 			deviceId: t.arg.string({required: true}),
		// 			code: t.arg.string({required:true})
		// 		},
		// 		resolve: async (parent, { deviceId, code }, ctx) => {
		// 			// ctx.request.cook
		// 			const token = await ctx.reply.jwtSign({
		// 				deviceId,
		// 			});

		// 			ctx.reply.setCookie("token", token, {
		// 				// domain: 'localhost:6678',
		// 				// path: '/'
		// 				secure: true,
		// 				httpOnly: true,
		// 				// sameSite: true,
		// 				sameSite: "none",
		// 			});

		// 			return "cookie sent";
		// 		},
		// 	}),
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
