import { prisma } from "./prisma";

(async () => {
	prisma.wallpaper.create({
		data: {
			u_url:
				"https://images.thdstatic.com/productImages/de8cb8a4-fad5-48f4-b5be-659cddcc30ea/svn/stiletto-claw-hammers-tb3mc-e4_300.jpg",
		},
	});
})();
