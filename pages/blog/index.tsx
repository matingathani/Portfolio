import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import Link from 'next/link';

const BlogSection = styled.section`
  padding: 120px 5% 80px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.a`
  display: block;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.25rem;
  border-radius: 14px;
  text-decoration: none;
  color: ${p => p.theme.colors.text};
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0,0,0,.2);
    border-color: rgba(255,255,255,.2);
  }
  h3 { margin: 0 0 .5rem; font-size: 1.25rem; }
  p { margin: 0; color: ${p => p.theme.colors.textSecondary}; line-height: 1.6; }
`;

const posts = [
  {
    slug: 'ml-notes-from-musikaar',
    title: 'ML Notes from My Musikaar Internship',
    excerpt: 'Tokenization choices, evaluation pitfalls, and practical tips that helped me improve HR data pipelines.'
  },
  {
    slug: 'teaching-tips-ugta',
    title: 'Teaching Tips from UGTA: Helping Students Debug Faster',
    excerpt: 'Patterns I saw while tutoring FSE 100 and CSE 220 — and how to fix them.'
  },
  {
    slug: 'building-3d-portfolios',
    title: 'Building 3D Portfolios with Three.js + React Three Fiber',
    excerpt: 'Design guidelines and performance tricks for adding tasteful 3D to web UIs.'
  }
];

export default function BlogIndex() {
  return (
    <Layout>
      <BlogSection>
        <Title>Blog</Title>
        <Grid>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} passHref legacyBehavior>
              <Card>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </Card>
            </Link>
          ))}
        </Grid>
      </BlogSection>
    </Layout>
  );
}


