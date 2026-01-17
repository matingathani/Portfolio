import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const routes = [
    "",
    "/about",
    "/blog",
  ];

  const pages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return pages;
}
