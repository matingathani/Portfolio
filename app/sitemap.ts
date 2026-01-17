import type { MetadataRoute } from "next";
import { content } from "../lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const routes = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/skills",
    "/resume",
    "/contact",
  ];

  const pages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectPages = content.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...pages, ...projectPages];
}
