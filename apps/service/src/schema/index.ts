import { builder } from "../builder";

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
		activeCollectionId: t.exposeInt("activeCollectionId", {
			nullable: true,
		}),
	}),
});

export const Wallpaper = builder.prismaObject("Wallpaper", {
	fields: (t) => ({
		id: t.exposeID("id"),
		unsplashUrl: t.exposeString("u_url", { nullable: true }),
	}),
});

export const Collection = builder.prismaObject("Collection", {
	fields: (t) => ({
		id: t.exposeID("id"),
		name: t.exposeString("name"),
		wallpapers: t.relation("wallpapers"),
		// createdAt: t.string("createdAt"),
	}),
});
