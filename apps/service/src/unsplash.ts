import got from "got";

export const getUnsplashUrl = async (keywords?: string) => {
  let imageUrl = "https://source.unsplash.com/random/1920x1080";

  if (keywords) {
    imageUrl += `?/${keywords}`;
  }

  const res = await got(imageUrl);
  // this is the url for the image
  // default quality is 80%, we want 100%
  const url = new URL(res.url);
  url.searchParams.set("q", "100");

  return url.href;
};

export const waitToGetUnsplashUrl = async (keywords?: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  return getUnsplashUrl(keywords);
};
