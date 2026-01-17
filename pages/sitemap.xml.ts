import type { GetServerSideProps } from "next";
import { resume } from "../data/resume";

const SITE_URL = "https://matingathani.me";

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const staticPages = ["/", "/about", "/experience", "/projects", "/skills", "/resume", "/contact", "/blog"];
  const blogPages = [
    "/blog/ml-notes-from-musikaar",
    "/blog/teaching-tips-ugta",
    "/blog/building-3d-portfolios",
  ];
  const projectPages = resume.projects.map((project) => `/projects/${project.slug}`);

  const urls = [...staticPages, ...blogPages, ...projectPages]
    .map((path) => `\n  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`)
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}\n</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
