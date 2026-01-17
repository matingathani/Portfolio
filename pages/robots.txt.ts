import type { GetServerSideProps } from "next";

const SITE_URL = "https://matingathani.me";

const Robots = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml`);
  res.end();

  return { props: {} };
};

export default Robots;
