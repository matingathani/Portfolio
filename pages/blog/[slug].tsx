import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import { Container, PageSection, SectionHeader } from '../../components/ui';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(ArcElement, RadialLinearScale, Tooltip, Legend);

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: .5rem;
  background: ${p => p.theme.colors.gradient1};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Meta = styled.div`
  color: ${p => p.theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const H2 = styled.h2`
  margin: 2rem 0 1rem;
`;

const P = styled.p`
  line-height: 1.8;
  color: ${p => p.theme.colors.textSecondary};
`;

const Card = styled.div`
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 14px;
  padding: 1rem 1.25rem;
`;

const SkillPolar = () => {
  const data = {
    labels: ['Tokenization', 'Evaluation', 'Data Cleaning', 'APIs', 'UI'],
    datasets: [
      {
        data: [90, 80, 85, 70, 60],
        backgroundColor: [
          'rgba(110, 87, 224, 0.7)',
          'rgba(0, 194, 255, 0.7)',
          'rgba(110, 87, 224, 0.7)',
          'rgba(0, 194, 255, 0.7)',
          'rgba(255, 165, 0, 0.7)'
        ],
        borderWidth: 1
      }
    ]
  };
  return (
    <div style={{ height: 320 }}>
      <PolarArea data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

const posts: Record<string, { title: string; date: string; content: React.ReactNode }>= {
  'ml-notes-from-musikaar': {
    title: 'ML Notes from My Musikaar Internship',
    date: 'Aug 2024',
    content: (
      <>
        <P>Practical lessons that helped me improve HR data pipelines quickly: get tokenization right, measure with honest metrics, and keep a feedback loop between data and UI.</P>
        <H2>Interactive: Impact Focus Areas</H2>
        <Card>
          <SkillPolar />
        </Card>
        <H2>Takeaways</H2>
        <P>Pick tokenizers based on domain, version your datasets, and make error analysis a weekly habit.</P>
      </>
    )
  },
  'teaching-tips-ugta': {
    title: 'Teaching Tips from UGTA: Helping Students Debug Faster',
    date: 'May 2023',
    content: (
      <>
        <P>Debugging is a teachable skill. I focused on reproducible cases, logging, and hypothesis-driven fixes.</P>
        <H2>3-Step Loop</H2>
        <P>Reproduce → Isolate → Verify. Students who used this loop resolved issues 2x faster.</P>
      </>
    )
  },
  'building-3d-portfolios': {
    title: 'Building 3D Portfolios with Three.js + React Three Fiber',
    date: 'Jan 2025',
    content: (
      <>
        <P>Use lightweight geometry, limit lights, and float elements for a premium feel without heavy models.</P>
        <H2>Performance Tips</H2>
        <P>Prefer wireframe or flat materials, memoize components, and lazy-load non-critical canvases.</P>
      </>
    )
  }
};

export default function BlogPost() {
  const { query } = useRouter();
  const slug = (query.slug as string) || '';
  const post = posts[slug];

  return (
    <Layout>
      <PageSection>
        <Container style={{ maxWidth: 900 }}>
          {post ? (
            <>
              <SectionHeader>
                <h1>{post.title}</h1>
                <p>{post.date} • 5 min read</p>
              </SectionHeader>
              {post.content}
            </>
          ) : (
            <>
              <Title>Post not found</Title>
              <P>The article you’re looking for does not exist yet.</P>
            </>
          )}
        </Container>
      </PageSection>
    </Layout>
  );
}


