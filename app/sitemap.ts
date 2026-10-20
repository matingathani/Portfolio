import type { MetadataRoute } from "next";
import { posts } from "../lib/blog";
import { sitePaths } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = sitePaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes];
}
